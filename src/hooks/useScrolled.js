import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `enter` px; flips back below `exit` px.
 * The gap between the two keeps the navbar from flickering at the threshold.
 */
export default function useScrolled(enter = 40, exit = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((current) => (current ? y > exit : y > enter));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enter, exit]);

  return scrolled;
}
