import {
  GithubLogo,
  Eye,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { profile } from "../data/profile";
import { getAvailability } from "../data/availability";
import { useCvModal } from "../context/CvModalContext";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function Hero() {
  const { links, terminal } = profile;
  const availability = getAvailability(profile.availability);
  const { openCv } = useCvModal();

  return (
    <header className="section-px relative overflow-hidden pb-14 pt-16 text-center grid-bg">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full hero-glow animate-glowPulse"
        aria-hidden
      />

      <Badge label={availability.label} dot={availability.dot} />

      <p
        className="mt-7 flex items-center justify-center gap-2 text-base text-ng-text2 animate-fadeUp"
        style={{ animationDelay: "0.05s" }}
      >
        <span className="inline-block origin-[70%_80%] animate-wave text-xl" aria-hidden>
          👋
        </span>
        {profile.greeting}
      </p>

      <h1
        className="relative z-[1] mb-5 mt-2.5 text-[clamp(2rem,6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.04em] animate-fadeUp"
        style={{ animationDelay: "0.15s" }}
      >
        {profile.name}.
        <br />
        <span className="text-ng-muted-l">{profile.tagline}</span>
      </h1>

      <p
        className="mb-[18px] text-xs italic tracking-wide text-ng-text3 animate-fadeUp"
        style={{ animationDelay: "0.2s" }}
      >
        {profile.role}
      </p>

      <p
        className="mx-auto mb-9 max-w-[520px] text-[15px] font-light leading-[1.7] text-ng-text2 animate-fadeUp"
        style={{ animationDelay: "0.25s" }}
      >
        {profile.bio}
      </p>

      <div
        className="mb-12 flex flex-wrap items-center justify-center gap-2.5 animate-fadeUp"
        style={{ animationDelay: "0.3s" }}
      >
        <Button onClick={openCv}>
          <Eye size={15} weight="regular" />
          View CV
        </Button>
        <Button variant="ghost" href={links.github}>
          <GithubLogo size={15} weight="regular" />
          GitHub
        </Button>
        <Button variant="ghost" href={links.linkedin}>
          <LinkedinLogo size={15} weight="regular" />
          LinkedIn
        </Button>
      </div>

      <div
        className="mx-auto max-w-[540px] overflow-hidden rounded-[10px] border border-ng-border2 bg-ng-terminal text-left animate-fadeUp"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center gap-1.5 border-b border-ng-border bg-ng-surface px-3.5 py-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <div className="px-[18px] py-4 font-mono text-xs leading-8">
          <div>
            <span className="text-ng-text3">~/projects $ </span>
            <span>git log --oneline --graph</span>
          </div>
          {terminal.commits.map((commit) => (
            <span
              key={commit.hash}
              className={`block ${commit.type === "out2" ? "text-ng-terminal-out2" : "text-ng-terminal-out"}`}
            >
              * {commit.hash} {commit.msg}
            </span>
          ))}
          <div>
            <span className="text-ng-text3">~/projects $ </span>
            <span className="animate-termBlink">▌</span>
          </div>
        </div>
      </div>
    </header>
  );
}
