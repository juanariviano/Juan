import { profile } from "../data/profile";
import { getAvailability } from "../data/availability";
import Reveal from "./motion/Reveal";
import Section from "./ui/Section";

function factValue(fact, availability) {
  if (fact.valueKey === "availability") return availability.fact;
  return fact.value;
}

export default function About() {
  const { about } = profile;
  const availability = getAvailability(profile.availability);
  const [headlineTop, headlineBottom] = about.headline.split("\n");

  return (
    <Section
      id="about"
      className="section-px grid grid-cols-1 items-start gap-10 border-b border-ng-border py-12 md:grid-cols-2 lg:gap-16 xl:gap-24"
    >
      <Reveal>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ng-muted">
          About
        </p>
        <h2 className="mb-4 text-[26px] font-semibold leading-snug tracking-tight">
          {headlineTop}
          <br />
          {headlineBottom}
        </h2>
        {about.paragraphs.map((p) => (
          <p
            key={p.slice(0, 24)}
            className="mb-5 text-[13px] font-light leading-[1.85] text-ng-text2"
          >
            {p}
          </p>
        ))}
        <div className="flex flex-wrap gap-1.5">
          {about.stack.map((chip) => (
            <span
              key={chip}
              className="cursor-default rounded-full border border-ng-border2 bg-ng-surface px-[11px] py-1 text-[11px] font-medium text-ng-muted-l transition-all duration-150 hover:border-ng-border2 hover:bg-ng-surface-hover"
            >
              {chip}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="flex flex-col gap-2.5">
        {about.facts.map((fact, i) => (
          <Reveal key={fact.label} delay={i * 0.06}>
            <div
              className={`rounded-r-lg border border-ng-border bg-ng-surface px-4 py-3.5 ${fact.accent ? "border-l-2 border-l-ng-fg" : "border-l-2 border-l-ng-muted"}`}
            >
              <div className="mb-1 text-[10px] uppercase tracking-[0.15em] text-ng-text3">
                {fact.label}
              </div>
              <div className="text-[13px] leading-relaxed text-ng-fg">
                {factValue(fact, availability)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
