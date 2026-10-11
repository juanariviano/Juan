import { EnvelopeSimple, Eye } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { availability, contact, profile } from "../content";
import { useCvModal } from "../context/CvModalContext";
import Reveal from "./motion/Reveal";
import Button from "./ui/Button";
import Squiggle from "./ui/Squiggle";

const CHIP_TILTS = [-1, 1.5, -1.5, 1];

export default function Contact() {
  const reduce = useReducedMotion();
  const { openCv } = useCvModal();
  const { section } = contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-h"
      className="mx-auto max-w-[920px] px-6 pb-20 pt-6"
    >
      <Reveal>
        <motion.div
          className="relative rounded-lg border border-nb-rule bg-nb-card px-6 pb-12 pt-14 text-center shadow-[0_20px_40px_-28px_var(--nb-shadow)] sm:px-10"
          style={{ rotate: -0.5 }}
          whileHover={reduce ? undefined : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute right-4 top-4 flex h-[76px] w-16 flex-col items-center justify-center gap-0.5 rounded border-2 border-dashed border-nb-ink font-mono text-[10px] font-semibold sm:right-6 sm:top-5"
            {...(reduce
              ? { style: { rotate: 6 } }
              : {
                  initial: { opacity: 0, scale: 1.8, rotate: -12 },
                  whileInView: { opacity: 1, scale: 1, rotate: 6 },
                  viewport: { once: true, amount: 1 },
                  transition: { type: "spring", stiffness: 380, damping: 16, delay: 0.25 },
                })}
          >
            <span className="text-[15px]">{contact.stamp[0]}</span>
            <span>{contact.stamp[1]}</span>
          </motion.div>

          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-nb-ink3">
            {section.number} · {section.eyebrow}
          </p>
          <h2
            id="contact-h"
            className="mt-3 font-hand text-[32px] font-normal leading-[1.25] sm:text-[44px]"
          >
            {section.title}{" "}
            <span className="relative inline-block">
              {section.titleUnderline}
              <Squiggle className="absolute -bottom-1 left-0 h-2.5 w-full" onView delay={0.3} />
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] font-mono text-[13.5px] leading-[1.8] text-nb-ink2">
            {availability.cta}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <Button href={profile.links.email}>
              <EnvelopeSimple size={16} aria-hidden="true" />
              {contact.emailLabel}
            </Button>
            <Button variant="ghost" onClick={openCv}>
              <Eye size={16} aria-hidden="true" />
              {contact.cvLabel}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="font-hand text-sm text-nb-ink3">{contact.socialsLabel}</span>
            {contact.socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-nb-rule bg-nb-chip px-4 font-hand text-sm text-nb-ink shadow-chip"
                style={{ rotate: CHIP_TILTS[i % CHIP_TILTS.length] }}
                whileHover={reduce ? undefined : { rotate: 0, y: -2 }}
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
