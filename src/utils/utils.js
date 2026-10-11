export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Resolve a path under public/ (works with GitHub Pages homepage prefix). */
export function publicUrl(path) {
  const base = process.env.PUBLIC_URL || "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function isExternalHref(href) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:");
}

/** "Node.js" -> "nodejs", used to match project tech against filters. */
export function tagId(label) {
  return String(label).toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Replace {year}-style placeholders in copy from the JSON files. */
export function fillTemplate(text, vars = {}) {
  return String(text).replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match
  );
}

/** Split "plain ==marked== plain" into segments; marked ones get a highlighter. */
export function splitHighlights(text) {
  return String(text)
    .split("==")
    .map((part, i) => ({ text: part, mark: i % 2 === 1 }))
    .filter((part) => part.text);
}

export function countHighlights(text) {
  return splitHighlights(text).filter((part) => part.mark).length;
}
