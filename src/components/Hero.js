import {
  ArrowCounterClockwise,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  PencilSimple,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { availability, profile } from "../content";
import { useCvModal } from "../context/CvModalContext";
import useHandwriting from "../hooks/useHandwriting";
import { cn, countHighlights, isExternalHref } from "../utils/utils";
import HighlightText from "./ui/HighlightText";
import PulseDot from "./ui/PulseDot";
import Squiggle from "./ui/Squiggle";

const ICONS = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  email: EnvelopeSimple,
  cv: FileText,
};
const TILTS = [-1.5, 1.2, -1, 2];
const EASE = [0.16, 1, 0.3, 1];

const chipClass =
  "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-nb-rule bg-nb-chip px-4 text-nb-ink shadow-chip";

function fadeUp(reduce, delay) {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { openCv } = useCvModal();
  const { hero } = profile;

  const prefix = `${hero.greeting} `;
  const fullTitle = prefix + profile.nickname;
  const { count, done, replay } = useHandwriting(fullTitle, { enabled: !reduce });
  const typedPrefix = fullTitle.slice(0, Math.min(count, prefix.length));
  const typedName = count > prefix.length ? fullTitle.slice(prefix.length, count) : "";

  // Keep the highlighter shades cycling across paragraphs instead of restarting.
  let markOffset = 0;
  const paragraphs = hero.bio.map((text) => {
    const start = markOffset;
    markOffset += countHighlights(text);
    return { text, start };
  });

  return (
    <section
      id="top"
      aria-label="Intro"
      className="mx-auto max-w-[920px] px-6 pb-24 pt-16 sm:pt-24"
    >
      <div className="max-w-[680px]">
        <h1 className="font-hand text-[40px] font-normal leading-[1.3] tracking-[0.01em] sm:text-[54px]">
          <span className="sr-only">{fullTitle}</span>
          {/* Letters are written one by one; clicking the line writes it again. */}
          <span
            aria-hidden="true"
            onClick={replay}
            title="click to write it again"
            className="relative inline-block cursor-pointer select-none"
          >
            {/* Invisible copy reserves the final size so nothing shifts while writing. */}
            <span className="invisible">
              {prefix}
              {profile.nickname}
            </span>
            <span className="absolute inset-0">
              {typedPrefix}
              {typedName && (
                <span className="relative inline-block">
                  <motion.span
                    className="absolute -inset-x-2 bottom-[10%] top-[22%] origin-left rounded-[3px] bg-nb-hl2"
                    style={{ rotate: -1.5 }}
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: done ? 1 : 0 }}
                    transition={{ duration: done ? 0.5 : 0.15, ease: EASE }}
                  />
                  <span className="relative">{typedName}</span>
                  <Squiggle
                    className="absolute -bottom-1.5 -left-1 h-3 w-[calc(100%+8px)]"
                    active={done}
                    delay={done ? 0.35 : 0}
                  />
                </span>
              )}
              {!done && (
                <PencilSimple
                  size={22}
                  weight="bold"
                  className="ml-1 inline-block animate-scribble align-baseline text-nb-ink2"
                />
              )}
            </span>
          </span>
        </h1>

        <motion.div
          className="mt-3 flex flex-wrap items-center gap-3.5"
          {...fadeUp(reduce, 0.7)}
        >
          <span className="-rotate-[0.5deg] font-hand text-[17px] text-nb-ink2 sm:text-[19px]">
            {profile.role}
          </span>
          {!reduce && (
            <button
              type="button"
              onClick={replay}
              aria-label="Write the greeting again"
              title="write it again"
              className={cn(
                "-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-nb-ink3 transition-all duration-300 hover:bg-nb-hl1 hover:text-nb-ink",
                done ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <ArrowCounterClockwise size={15} />
            </button>
          )}
          <span className="inline-flex items-center gap-2.5 rounded-full border border-nb-rule bg-nb-chip px-3 py-1.5 font-mono text-[11px] text-nb-ink2">
            <PulseDot />
            {availability.badge}
          </span>
        </motion.div>

        <div className="mt-8 flex max-w-[640px] flex-col gap-3.5 font-mono text-[13px] leading-[1.95] text-nb-ink2 sm:text-[13.5px]">
          {paragraphs.map((p, i) => (
            <motion.div key={p.text} {...fadeUp(reduce, 0.9 + i * 0.12)}>
              <HighlightText
                text={p.text}
                startIndex={p.start}
                delay={reduce ? 0 : 1.3 + i * 0.25}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <motion.span
            className="mr-1 -rotate-2 font-hand text-sm text-nb-ink3"
            {...fadeUp(reduce, 1.35)}
          >
            {hero.socialsLabel}
          </motion.span>
          {hero.socials.map((social, i) => {
            const Icon = ICONS[social.icon] ?? FileText;
            // The outer span handles the staggered entrance; the chip itself
            // keeps its tilt and straightens on hover without inheriting the delay.
            const chipProps = {
              style: { rotate: TILTS[i % TILTS.length] },
              whileHover: { rotate: 0, y: -3 },
              whileTap: { scale: 0.96 },
              transition: { type: "spring", stiffness: 380, damping: 20 },
              className: chipClass,
            };
            const content = (
              <>
                <Icon size={15} aria-hidden="true" />
                <span className="font-hand text-[15px]">{social.label}</span>
              </>
            );
            const external =
              social.href && isExternalHref(social.href) && !social.href.startsWith("mailto:");

            return (
              <motion.span
                key={social.label}
                className="inline-flex"
                {...fadeUp(reduce, 1.45 + i * 0.08)}
              >
                {social.action === "cv" ? (
                  <motion.button type="button" onClick={openCv} {...chipProps}>
                    {content}
                  </motion.button>
                ) : (
                  <motion.a
                    href={social.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...chipProps}
                  >
                    {content}
                  </motion.a>
                )}
              </motion.span>
            );
          })}
        </div>

        {!reduce && hero.doodleHint && (
          <motion.p
            className="mt-6 hidden items-center gap-2 font-hand text-[13px] text-nb-ink3 md:flex [@media(pointer:coarse)]:hidden"
            {...fadeUp(reduce, 2)}
          >
            <PencilSimple size={14} aria-hidden="true" />
            {hero.doodleHint}
          </motion.p>
        )}
      </div>
    </section>
  );
}
