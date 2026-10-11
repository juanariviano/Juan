import { useEffect } from "react";
import { DownloadSimple, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "../content";
import { publicUrl } from "../utils/utils";
import Button from "./ui/Button";

export default function CvModal({ open, onClose }) {
  const reduce = useReducedMotion();
  const cvUrl = publicUrl(profile.cv.url);

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
            className="relative flex h-[min(90vh,820px)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-nb-rule bg-nb-card shadow-2xl"
            initial={reduce ? false : { opacity: 0, y: 24, rotate: -1.5, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, rotate: 1, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-nb-rule px-5 py-4">
              <div>
                <p className="mb-1 font-mono text-[10px] tracking-[0.15em] text-nb-ink3">CV.pdf</p>
                <h2 id="cv-modal-title" className="font-hand text-xl text-nb-ink">
                  {profile.nickname}&apos;s resume
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

            <div className="min-h-0 flex-1 bg-nb-paper p-1">
              <iframe
                src={cvUrl}
                title={`${profile.name} CV`}
                className="h-full w-full rounded-md border-0 bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-dashed border-nb-rule px-5 py-3">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button href={cvUrl} download={profile.cv.downloadName}>
                <DownloadSimple size={15} aria-hidden="true" />
                Download CV
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
