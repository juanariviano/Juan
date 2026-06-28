import { marqueeSkills } from "../data/skills";

export default function Marquee() {
  const sequence = marqueeSkills.flatMap((skill, i) =>
    i < marqueeSkills.length - 1 ? [skill, "·"] : [skill]
  );
  const items = [...sequence, ...sequence];

  return (
    <div className="overflow-hidden border-y border-ng-border bg-ng-surface py-6">
      <div className="flex w-max animate-scrollX gap-12 motion-reduce:animate-none">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-xs tracking-wide text-ng-text3"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
