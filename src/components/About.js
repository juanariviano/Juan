import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { about, availability } from "../content";
import Reveal from "./motion/Reveal";
import SectionHeading from "./ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1];
const LABEL_TILTS = [-2, 1.5, -1, 2.2, -1.6, 0.8, -2.4, 1.2, -0.6, 2, -1.8, 1, -1.2, 2.4, -0.8, 1.6];

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return undefined;
    }
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{value}</span>;
}

function StickyNote() {
  const reduce = useReducedMotion();
  const { stats } = about;
  // The note "slaps" onto the page: it lands crooked and settles with a spring.
  const slap = reduce
    ? { style: { rotate: -2.5 } }
    : {
        initial: { opacity: 0, y: 24, rotate: -8 },
        whileInView: { opacity: 1, y: 0, rotate: -2.5 },
        viewport: { once: true, amount: 0.5 },
        transition: { type: "spring", stiffness: 160, damping: 14 },
      };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[260px] bg-nb-sticky px-6 pb-7 pt-6 shadow-[0_16px_24px_-16px_var(--nb-shadow)]"
      {...slap}
    >
      <span className="tape -top-2.5 left-1/2 h-[22px] w-[76px] -translate-x-1/2 -rotate-2" />
      <p className="font-hand text-base">{stats.title}</p>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {stats.items.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-3">
            <span className="min-w-[58px] font-hand text-[42px] leading-none">
              <CountUp to={stat.value} />
              {stat.suffix}
            </span>
            <span className="font-mono text-xs">{stat.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const labelList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const labelItem = {
  hidden: { opacity: 0, scale: 1.35, y: -6 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 18 },
  },
};

export default function About() {
  const reduce = useReducedMotion();
  const facts = about.facts
    .map((fact) => ({
      ...fact,
      value: fact.fromAvailability ? availability.fact : fact.value,
    }))
    .filter((fact) => fact.value && fact.value.trim());

  return (
    <section
      id="about"
      aria-labelledby="about-h"
      className="mx-auto max-w-[920px] px-6 pb-24 pt-6"
    >
      <SectionHeading id="about-h" section={about.section} />

      <div className="mt-2 grid grid-cols-1 items-start gap-11 md:grid-cols-[250px_minmax(0,1fr)]">
        <StickyNote />

        <Reveal delay={0.1}>
          <dl className="rounded-lg border border-nb-rule bg-nb-card px-6 py-1.5 shadow-card">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`grid grid-cols-1 gap-1 py-4 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-4 ${
                  i < facts.length - 1 ? "border-b border-dashed border-nb-rule" : ""
                }`}
              >
                <dt className="font-hand text-[15px] text-nb-ink3">{fact.label}</dt>
                <dd className="m-0 text-[15px] leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-14">
        <p className="mb-4 font-hand text-base text-nb-ink3">{about.toolbox.title}</p>
        <motion.ul
          aria-label="Tech stack"
          className="m-0 flex list-none flex-wrap gap-x-2.5 gap-y-3.5 p-0"
          variants={reduce ? undefined : labelList}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {about.toolbox.items.map((label, i) => (
            <motion.li
              key={label}
              variants={reduce ? undefined : labelItem}
              style={{ rotate: LABEL_TILTS[i % LABEL_TILTS.length] }}
            >
              <span className="dymo transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-[-1deg]">
                {label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
