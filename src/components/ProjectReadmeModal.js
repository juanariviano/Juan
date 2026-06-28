import { useCallback, useEffect, useState } from "react";
import { X, NoteBlank } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NO_DESCRIPTION = "No description has been provided for this project";

async function fetchReadme(slug) {
  const base = process.env.PUBLIC_URL || "";
  const res = await fetch(`${base}/readmes/${slug}.md`);
  if (!res.ok) throw new Error("not-found");
  return res.text();
}

function EmptyNote() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-ng-border2 bg-ng-surface px-6 py-12 text-center">
      <NoteBlank size={28} className="mb-3 text-ng-text3" />
      <p className="text-sm leading-relaxed text-ng-text2">{NO_DESCRIPTION}</p>
    </div>
  );
}

const markdownComponents = {
  table: ({ children }) => (
    <div className="readme-table-wrap">
      <table>{children}</table>
    </div>
  ),
};

export default function ProjectReadmeModal({ project, onClose }) {
  const reduce = useReducedMotion();
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("idle");

  const loadReadme = useCallback(async (slug) => {
    const trimmed = slug?.trim();
    if (!trimmed) {
      setContent("");
      setStatus("empty");
      return;
    }

    setStatus("loading");
    try {
      const text = await fetchReadme(trimmed);
      setContent(text);
      setStatus("ready");
    } catch {
      setContent("");
      setStatus("empty");
    }
  }, []);

  useEffect(() => {
    if (!project) return;
    loadReadme(project.readmeSlug);
  }, [project, loadReadme]);

  useEffect(() => {
    if (!project) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 border-none bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="readme-modal-title"
            className="relative flex max-h-[min(88vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-ng-border2 bg-ng-bg2 shadow-2xl"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ng-border px-5 py-4">
              <div>
                <p className="mb-1 font-mono text-[10px] tracking-[0.15em] text-ng-text3">
                  README.md
                </p>
                <h2
                  id="readme-modal-title"
                  className="text-lg font-semibold tracking-tight text-ng-fg"
                >
                  {project.name}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ng-border2 bg-ng-surface text-ng-text2 transition-colors hover:bg-ng-surface-hover hover:text-ng-fg"
              >
                <X size={16} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              {status === "loading" && (
                <p className="text-sm text-ng-text3">Loading...</p>
              )}

              {status === "empty" && <EmptyNote />}

              {status === "ready" && content && (
                <article className="readme-prose">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {content}
                  </ReactMarkdown>
                </article>
              )}
            </div>

            <div className="flex flex-wrap gap-3 border-t border-ng-border px-5 py-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-ng-text3 transition-colors hover:text-ng-fg"
              >
                Repo ↗
              </a>
              {project.deploy !== "none" && (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-ng-text3 transition-colors hover:text-ng-fg"
                >
                  Live ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
