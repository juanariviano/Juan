import { useState } from "react";
import { CaretDown, MapPin } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { experience } from "../content";
import { tagId } from "../utils/utils";
import Reveal from "./motion/Reveal";
import SectionHeading from "./ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1];

function formatPeriod({ start, end }) {
  const endLabel = !end || /^(now|present)$/i.test(end) ? "present" : end;
  return `${start} — ${endLabel}`;
}

function ExperienceRow({ item }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(Boolean(item.openByDefault));
  const bodyId = `exp-${tagId(item.company)}`;
  const period = formatPeriod(item);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 rounded-2xl px-5 py-5 text-left transition-colors hover:bg-nb-paper sm:px-6 sm:py-[22px]"
      >
        <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[10px] bg-nb-ink font-mono text-xs font-semibold text-nb-paper">
          {item.logo}
        </span>
        <span className="block min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2.5">
            <span className="text-[17px] font-semibold">{item.company}</span>
            {item.badge && (
              <span className="rounded-full border border-nb-rule px-2.5 py-0.5 font-mono text-[10.5px] text-nb-ink3">
                {item.badge}
              </span>
            )}
          </span>
          <span className="mt-1 block text-[15px] text-nb-ink2">{item.role}</span>
          <span className="mt-1.5 block font-mono text-[11.5px] text-nb-ink3 sm:hidden">
            {period}
            {item.location && ` · ${item.location}`}
          </span>
        </span>
        <span className="hidden flex-none pt-0.5 text-right font-mono text-xs text-nb-ink2 sm:block">
          <span className="block">{period}</span>
          {item.location && (
            <span className="mt-1.5 flex items-center justify-end gap-1 text-nb-ink3">
              <MapPin size={12} aria-hidden="true" />
              {item.location}
            </span>
          )}
        </span>
        <motion.span
          className="mt-3 flex-none text-nb-ink3"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          aria-hidden="true"
        >
          <CaretDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={bodyId}
            key="body"
            className="overflow-hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="px-5 pb-6 sm:pl-[86px] sm:pr-6">
              <p className="max-w-[640px] text-[15px] leading-[1.7] text-nb-ink2">
                {item.description}
              </p>
              {item.tags?.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-1.5 font-mono text-[11px] text-nb-ink2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-nb-rule px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="work"
      aria-labelledby="work-h"
      className="mx-auto max-w-[920px] px-6 pb-24 pt-6"
    >
      <SectionHeading id="work-h" section={experience.section} hint={experience.section.hint} />
      <Reveal delay={0.08}>
        <div className="relative divide-y divide-dashed divide-nb-rule rounded-2xl border border-nb-rule bg-nb-card shadow-card">
          <span className="tape -top-[11px] right-16 h-[22px] w-24 rotate-2" />
          {experience.items.map((item) => (
            <ExperienceRow key={`${item.company}-${item.start}`} item={item} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
