import { useEffect } from "react";
import { DownloadSimple, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "../data/profile";
import Button from "./ui/Button";

export default function CvModal({ open, onClose }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
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
            aria-labelledby="cv-modal-title"
            className="relative flex h-[min(90vh,820px)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-ng-border2 bg-ng-bg2 shadow-2xl"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ng-border px-5 py-4">
              <div>
                <p className="mb-1 font-mono text-[10px] tracking-[0.15em] text-ng-text3">
                  CV.pdf
                </p>
                <h2
                  id="cv-modal-title"
                  className="text-lg font-semibold tracking-tight text-ng-fg"
                >
                  {profile.name}&apos;s Resume
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

            <div className="min-h-0 flex-1 bg-ng-terminal p-1">
              <iframe
                src={profile.cvUrl}
                title={`${profile.name} CV`}
                className="h-full w-full rounded-md border-0 bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-ng-border px-5 py-3">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button href={profile.cvUrl} download={profile.cvDownloadName}>
                <DownloadSimple size={15} weight="regular" />
                Download CV
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
