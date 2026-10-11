import { useEffect, useId, useState } from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { useTheme } from "../../context/ThemeContext";

// Renders a project README the way GitHub does: raw HTML (<details>, <div align>),
// [!NOTE]-style alerts, mermaid diagrams, heading anchors, and repo-relative links.

const ALERT_RE = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\n?/i;
const ALERT_LABELS = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution",
};

/** remark plugin: turn `> [!WARNING]` blockquotes into labelled callouts. */
function remarkGithubAlerts() {
  const walk = (node) => {
    if (node.type === "blockquote") {
      const first = node.children?.[0];
      const text = first?.type === "paragraph" ? first.children?.[0] : null;
      const match = text?.type === "text" ? ALERT_RE.exec(text.value) : null;
      if (match) {
        const type = match[1].toLowerCase();
        text.value = text.value.slice(match[0].length);
        if (!text.value) first.children.shift();
        if (first.children.length === 0) node.children.shift();
        node.data = {
          ...node.data,
          hName: "div",
          hProperties: { className: ["readme-alert", `readme-alert-${type}`] },
        };
        node.children.unshift({
          type: "paragraph",
          data: { hProperties: { className: ["readme-alert-title"] } },
          children: [{ type: "text", value: ALERT_LABELS[type] }],
        });
      }
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

// GitHub's sanitizer rules, plus class names so the callouts above keep their styling.
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes["*"] ?? []), "className"],
  },
};

function textOf(node) {
  if (!node) return "";
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

/** Same rule GitHub uses for heading anchors: "🍌 How it works" -> "-how-it-works". */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

function repoFrom(url) {
  const match = url?.match(/^https?:\/\/github\.com\/([^/]+\/[^/#?]+)/i);
  return match ? match[1].replace(/\.git$/, "") : null;
}

/** Point repo-relative links and images back at the GitHub repository. */
function makeUrlTransform(repo) {
  return (url, key) => {
    const safe = defaultUrlTransform(url);
    if (!safe || !repo) return safe;
    if (/^[a-z][a-z0-9+.-]*:/i.test(safe) || safe.startsWith("#") || safe.startsWith("//")) {
      return safe;
    }
    const path = safe.replace(/^\.?\/+/, "");
    return key === "src"
      ? `https://raw.githubusercontent.com/${repo}/HEAD/${path}`
      : `https://github.com/${repo}/blob/HEAD/${path}`;
  };
}

let mermaidLoader;
function loadMermaid() {
  // Loaded on demand so the (large) diagram library never weighs down the main bundle.
  mermaidLoader ??= import("mermaid").then((mod) => mod.default);
  return mermaidLoader;
}

function MermaidDiagram({ code }) {
  const { theme } = useTheme();
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    loadMermaid()
      .then(async (mermaid) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: theme === "dark" ? "dark" : "neutral",
          fontFamily: "DM Sans, system-ui, sans-serif",
        });
        const result = await mermaid.render(`mermaid-${baseId}-${theme}`, code);
        if (!cancelled) setSvg(result.svg);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [code, theme, baseId]);

  if (failed) {
    return (
      <pre>
        <code>{code}</code>
      </pre>
    );
  }

  if (!svg) {
    return <div className="readme-diagram font-hand text-sm text-nb-ink3">sketching the diagram…</div>;
  }

  // mermaid's "strict" security level sanitises the generated SVG.
  return <div className="readme-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}

function heading(Tag) {
  return function Heading({ node, children, ...props }) {
    return (
      <Tag id={slugify(textOf(node))} {...props}>
        {children}
      </Tag>
    );
  };
}

function Link({ node, href = "", children, ...props }) {
  if (href.startsWith("#")) {
    const onClick = (e) => {
      const id = decodeURIComponent(href.slice(1));
      const target =
        document.getElementById(id) || document.getElementById(`user-content-${id}`);
      if (!target) return;
      e.preventDefault();
      if (target.tagName === "DETAILS") target.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function Pre({ node, children, ...props }) {
  const code = node?.children?.find((child) => child.tagName === "code");
  const className = code?.properties?.className ?? [];
  if (className.includes("language-mermaid")) {
    return <MermaidDiagram code={textOf(code).trim()} />;
  }
  return <pre {...props}>{children}</pre>;
}

const components = {
  h1: heading("h1"),
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  a: Link,
  pre: Pre,
  table: ({ node, children }) => (
    <div className="readme-table-wrap">
      <table>{children}</table>
    </div>
  ),
};

export default function Markdown({ content, repoUrl }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkGithubAlerts]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
      urlTransform={makeUrlTransform(repoFrom(repoUrl))}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
