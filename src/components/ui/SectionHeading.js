import Reveal from "../motion/Reveal";

export default function SectionHeading({ id, section, hint, hintTilt = -2 }) {
  return (
    <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-nb-ink3">
          {section.number} · {section.eyebrow}
        </p>
        <h2
          id={id}
          className="mt-2 font-hand text-[30px] font-normal leading-[1.25] sm:text-[38px]"
        >
          {section.title}
        </h2>
      </div>
      {hint && (
        <p
          className="font-hand text-sm text-nb-ink3"
          style={{ transform: `rotate(${hintTilt}deg)` }}
        >
          {hint}
        </p>
      )}
    </Reveal>
  );
}
