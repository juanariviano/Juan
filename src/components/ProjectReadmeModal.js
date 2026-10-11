import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NoteBlank, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { publicUrl } from "../utils/utils";

// The README renderer (HTML parser, sanitizer, diagrams) only loads once a readme is opened.
const Markdown = lazy(() => import("./ui/Markdown"));

const NO_DESCRIPTION = "No description has been provided for this project yet.";

async function fetchReadme(slug) {
  const res = await fetch(publicUrl(`/readmes/${slug}.md`));
  if (!res.ok) throw new Error("not-found");
  return res.text();
}

function EmptyNote() {
  return (
    <div className="hatch flex flex-col items-center justify-center rounded-lg border border-dashed border-nb-rule px-6 py-12 text-center">
      <NoteBlank size={28} className="mb-3 text-nb-ink3" aria-hidden="true" />
      <p className="font-hand text-base text-nb-ink2">{NO_DESCRIPTION}</p>
    </div>
  );
}

const footerLink =
  "border-b border-dashed border-nb-rule pb-px font-mono text-xs text-nb-ink2 transition-colors hover:border-nb-ink hover:text-nb-ink";

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
      setContent(await fetchReadme(trimmed));
      setStatus("ready");
    } catch {
      setContent("");
      setStatus("empty");
    }
  }, []);

  useEffect(() => {
    if (!project) return;
    loadReadme(project.readme);
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

  // Portal to <body> so the dialog sits above the sticky navbar and wall decor.
  return createPortal(
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
            className="relative flex max-h-[min(88vh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-nb-rule bg-nb-card shadow-2xl"
            initial={reduce ? false : { opacity: 0, y: 24, rotate: -1.5, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, rotate: 1, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-nb-rule px-5 py-4">
              <div>
                <p className="mb-1 font-mono text-[10px] tracking-[0.15em] text-nb-ink3">
                  README.md
                </p>
                <h2 id="readme-modal-title" className="font-hand text-xl text-nb-ink">
                  {project.name}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-nb-rule text-nb-ink2 transition-colors hover:border-nb-ink hover:text-nb-ink"
              >
                <X size={16} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              {status === "loading" && (
                <p className="font-hand text-sm text-nb-ink3">flipping to the right page…</p>
              )}

              {status === "empty" && <EmptyNote />}

              {status === "ready" && content && (
                <article className="readme-prose">
                  <Suspense
                    fallback={<p className="font-hand text-sm text-nb-ink3">flipping to the right page…</p>}
                  >
                    <Markdown content={content} repoUrl={project.github} />
                  </Suspense>
                </article>
              )}
            </div>

            <div className="flex flex-wrap gap-4 border-t border-dashed border-nb-rule px-5 py-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  repo ↗
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  live ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
