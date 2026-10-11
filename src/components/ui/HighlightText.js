import { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn, countHighlights, splitHighlights } from "../../utils/utils";

// Inverted (black) first, then the two greys, so neighbouring marks differ.
const SHADES = ["nb-mark-3", "nb-mark-1", "nb-mark-2"];
const STAGGER = 0.18;
const DRAW_TIME = 0.8;

/**
 * Renders text where ==words== become highlighter marks that swipe in
 * one after another once the paragraph is on screen.
 */
export default function HighlightText({
  as: Tag = "p",
  text,
  startIndex = 0,
  delay = 0,
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [settled, setSettled] = useState(false);
  const markCount = countHighlights(text);

  // Once every mark has been drawn, drop the staggered delays so later
  // changes (like switching theme) recolour the marks immediately.
  useEffect(() => {
    if (!inView) return undefined;
    const total = (delay + markCount * STAGGER + DRAW_TIME) * 1000;
    const id = setTimeout(() => setSettled(true), total);
    return () => clearTimeout(id);
  }, [inView, delay, markCount]);

  let order = 0;

  return (
    <Tag ref={ref} className={className}>
      {splitHighlights(text).map((part, i) => {
        if (!part.mark) return <Fragment key={i}>{part.text}</Fragment>;
        const shade = SHADES[(startIndex + order) % SHADES.length];
        const markDelay = delay + order * STAGGER;
        order += 1;
        return (
          <mark
            key={i}
            className={cn("nb-mark", shade, inView && "is-on")}
            style={settled ? undefined : { transitionDelay: `${markDelay}s` }}
          >
            {part.text}
          </mark>
        );
      })}
    </Tag>
  );
}
