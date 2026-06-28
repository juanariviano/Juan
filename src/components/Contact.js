import {
  EnvelopeSimple,
  Eye,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { profile } from "../data/profile";
import { getAvailability } from "../data/availability";
import { useCvModal } from "../context/CvModalContext";
import Reveal from "./motion/Reveal";
import Button from "./ui/Button";
import Section from "./ui/Section";

export default function Contact() {
  const { links } = profile;
  const availability = getAvailability(profile.availability);
  const { openCv } = useCvModal();

  return (
    <Section
      id="cta"
      className="section-px relative overflow-hidden py-[60px] text-center grid-bg"
    >
      <div
        className="pointer-events-none absolute -bottom-20 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full cta-glow"
        aria-hidden
      />

      <Reveal>
        <h2 className="relative z-[1] mb-3 text-[28px] font-semibold tracking-tight">
          Let&apos;s build something together.
        </h2>
        <p className="relative z-[1] mb-7 text-[13px] font-light text-ng-text2">
          {availability.cta}
        </p>
        <div className="relative z-[1] flex flex-wrap items-center justify-center gap-2.5">
          <Button href={links.email}>
            <EnvelopeSimple size={15} weight="regular" />
            Email me
          </Button>
          <Button variant="ghost" onClick={openCv}>
            <Eye size={15} weight="regular" />
            View CV
          </Button>
        </div>
        <div className="relative z-[1] mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button variant="social" href={links.github}>
            <GithubLogo size={14} weight="regular" />
            GitHub
          </Button>
          <Button variant="social" href={links.linkedin}>
            <LinkedinLogo size={14} weight="regular" />
            LinkedIn
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
