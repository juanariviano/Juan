import { experiences } from "../data/experiences";
import Reveal from "./motion/Reveal";
import Section from "./ui/Section";

function formatPeriod(start, end) {
  const endLabel =
    !end || end.toLowerCase() === "now" || end.toLowerCase() === "present"
      ? "now"
      : end;
  return `${start} - ${endLabel}`;
}

export default function Experience() {
  return (
    <Section id="exp" className="section-px border-b border-ng-border py-12">
      <Reveal>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ng-muted">
          Experience
        </p>
      </Reveal>

      <div className="mt-7 flex flex-col">
        {experiences.map((exp, i) => (
          <Reveal key={exp.role} delay={i * 0.08}>
            <div className="grid grid-cols-1 gap-5 border-b border-ng-border py-5 last:border-b-0 md:grid-cols-[120px_1fr]">
              <span className="pt-0.5 text-[11px] text-ng-text3">
                {formatPeriod(exp.startPeriod, exp.endPeriod)}
              </span>
              <div>
                <div className="mb-0.5 text-sm font-medium">{exp.role}</div>
                <div className="mb-2 text-xs text-ng-muted">{exp.company}</div>
                <p className="text-xs font-light leading-[1.75] text-ng-text2">
                  {exp.description}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-ng-border2 bg-ng-surface px-2 py-0.5 text-[10px] text-ng-text2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
