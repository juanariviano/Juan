import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../utils/utils";

const PATH = "M2 9C30 2 60 14 90 7S150 3 198 8";

/**
 * Hand-drawn underline that "draws" itself: on mount, when scrolled into view
 * (`onView`), or whenever `active` turns true (and erases when it turns false).
 */
export default function Squiggle({ className, delay = 0, onView = false, active }) {
  const reduce = useReducedMotion();

  let drawProps = {};
  if (!reduce) {
    if (active !== undefined) {
      drawProps = { initial: { pathLength: 0 }, animate: { pathLength: active ? 1 : 0 } };
    } else if (onView) {
      drawProps = {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, amount: 1 },
      };
    } else {
      drawProps = { initial: { pathLength: 0 }, animate: { pathLength: 1 } };
    }
  }

  return (
    <svg
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none overflow-visible", className)}
    >
      <motion.path
        d={PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        transition={{ delay, duration: 0.7, ease: "easeInOut" }}
        {...drawProps}
      />
    </svg>
  );
}
