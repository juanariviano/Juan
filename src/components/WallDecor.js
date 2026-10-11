import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "../content";
import { fillTemplate } from "../utils/utils";

const SPARK_CHARS = ["✦", "+", "✧", "*", "✦"];

function Coffee() {
  return (
    <svg viewBox="0 0 100 100" className="h-[104px] w-[104px]">
      <path d="M22 42h44v28a14 14 0 0 1-14 14H36a14 14 0 0 1-14-14z" />
      <path d="M66 50h6a9 9 0 0 1 0 18h-6" />
      <path d="M34 32c-4-6 4-10 0-16" />
      <path d="M45 32c-4-6 4-10 0-16" />
      <path d="M56 32c-4-6 4-10 0-16" />
      <path d="M12 92h70" />
    </svg>
  );
}

function Terminal() {
  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32">
      <path d="M10 20h80a6 6 0 0 1 6 6v50a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6z" />
      <path d="M4 34h92" />
      <circle cx="13" cy="27" r="2" />
      <circle cx="21" cy="27" r="2" />
      <circle cx="29" cy="27" r="2" />
      <path d="M18 50l10 8-10 8" />
      <path d="M34 66h20" />
    </svg>
  );
}

function Plane() {
  return (
    <svg viewBox="0 0 120 100" className="h-[125px] w-[150px]">
      <path d="M40 46L112 14 86 84 70 60z" />
      <path d="M70 60l42-46" />
      <path d="M38 48c-14 4-18 16-26 20s-8 12-4 22" strokeDasharray="3 6" />
    </svg>
  );
}

function Bulb() {
  return (
    <svg viewBox="0 0 100 100" className="h-[100px] w-[100px]">
      <path d="M50 12a24 24 0 0 0-14 43c3 2 5 6 5 10v5h18v-5c0-4 2-8 5-10a24 24 0 0 0-14-43z" />
      <path d="M42 78h16" />
      <path d="M44 86h12" />
      <path d="M20 30l-6-4" />
      <path d="M80 30l6-4" />
    </svg>
  );
}

/** A floating doodle that wobbles and throws a few sparks when clicked. */
function Doodle({ className, floatClass, tilt, caption, children }) {
  const [tap, setTap] = useState(0);
  const [sparks, setSparks] = useState([]);
  const timer = useRef(null);

  const onTap = () => {
    setTap((n) => n + 1);
    setSparks(
      SPARK_CHARS.map((char, i) => {
        const angle = (i / SPARK_CHARS.length) * Math.PI * 2 - Math.PI / 2;
        return {
          id: `${Date.now()}-${i}`,
          char,
          tx: `${Math.round(Math.cos(angle) * 34)}px`,
          ty: `${Math.round(Math.sin(angle) * 34)}px`,
        };
      })
    );
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSparks([]), 800);
  };

  return (
    <div className={`absolute text-nb-ink3 ${className}`} style={{ rotate: `${tilt}deg` }}>
      <div className={floatClass}>
        <div
          key={tap}
          onClick={onTap}
          className={`relative cursor-pointer select-none [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.7] ${
            tap ? "animate-wobble" : ""
          }`}
        >
          {children}
          {sparks.map((spark) => (
            <span
              key={spark.id}
              className="pointer-events-none absolute left-1/2 top-1/2 animate-sparkle font-hand text-base text-nb-ink2"
              style={{ "--tx": spark.tx, "--ty": spark.ty }}
            >
              {spark.char}
            </span>
          ))}
        </div>
        {caption && <p className="mt-1 text-center font-hand text-[13px]">{caption}</p>}
      </div>
    </div>
  );
}

export default function WallDecor() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Posters drift a little slower than the page, like they're pinned to a wall behind it.
  const driftA = useTransform(scrollY, [0, 3000], [0, reduce ? 0 : 140]);
  const driftB = useTransform(scrollY, [0, 3000], [0, reduce ? 0 : 90]);
  const { decor } = site;
  const vars = { year: new Date().getFullYear() };

  const hover = reduce ? undefined : { rotate: 0, scale: 1.04 };
  const spring = { type: "spring", stiffness: 220, damping: 18 };

  return (
    // Only shown when the side margins are wide enough to keep clear of the content column.
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] hidden min-[1400px]:block">
      <div className="[&>*]:pointer-events-auto">
        <Doodle className="left-24 top-[190px]" floatClass="animate-float-1" tilt={-8} caption={decor.doodles.coffee}>
          <Coffee />
        </Doodle>
        <Doodle className="left-20 top-[640px] w-32" floatClass="animate-float-2" tilt={5} caption={decor.doodles.terminal}>
          <Terminal />
        </Doodle>
        <Doodle className="left-[70px] top-[1300px]" floatClass="animate-float-3" tilt={-4} caption={decor.doodles.plane}>
          <Plane />
        </Doodle>
        <Doodle className="left-24 top-[2500px]" floatClass="animate-float-1" tilt={6} caption={decor.doodles.bulb}>
          <Bulb />
        </Doodle>

        <motion.div
          className="absolute right-[92px] top-[150px] w-[150px] bg-nb-poster px-4 pb-5 pt-[22px] text-nb-ink shadow-[0_10px_22px_-10px_var(--nb-shadow)]"
          style={{ y: driftA, rotate: 4 }}
          whileHover={hover}
          transition={spring}
        >
          <span className="tape -top-2.5 left-1/2 h-5 w-[70px] -translate-x-1/2 -rotate-[4deg]" />
          <p className="font-hand text-[19px] leading-[1.35]">{decor.motto[0]}</p>
          <p className="mt-1.5 font-hand text-[19px] leading-[1.35] underline decoration-2 underline-offset-[5px]">
            {decor.motto[1]}
          </p>
        </motion.div>

        <motion.div
          className="absolute right-[110px] top-[600px] w-[132px] bg-nb-ink px-3.5 py-[18px] text-nb-paper shadow-[0_10px_22px_-10px_var(--nb-shadow)]"
          style={{ y: driftB, rotate: -3 }}
          whileHover={hover}
          transition={spring}
        >
          <span className="tape -top-[9px] left-[18px] h-[18px] w-[54px] -rotate-12" />
          <span className="tape -top-[9px] right-3.5 h-[18px] w-[54px] rotate-[10deg]" />
          <p className="text-[26px] font-bold leading-[1.02] tracking-[-0.03em]">{decor.tagline}</p>
          <p className="mt-2.5 font-mono text-[10px] opacity-70">{fillTemplate(decor.signature, vars)}</p>
        </motion.div>

        <motion.div
          className="absolute right-[104px] top-[1260px] w-[140px] border border-nb-rule bg-nb-card px-3.5 pb-4 pt-3.5 shadow-[0_10px_22px_-12px_var(--nb-shadow)]"
          style={{ y: driftA, rotate: 3 }}
          whileHover={hover}
          transition={spring}
        >
          <span className="tape -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-3" />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-nb-ink3">{decor.note.label}</p>
          <p className="mt-1.5 font-hand text-[15px] leading-[1.45]">{decor.note.text}</p>
        </motion.div>
      </div>
    </div>
  );
}
