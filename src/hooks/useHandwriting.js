import { useCallback, useEffect, useState } from "react";

/**
 * Reveals `text` one character at a time, like it's being written by hand.
 * Returns how many characters are visible, whether it's finished, and replay().
 */
export default function useHandwriting(text, { charMs = 70, startMs = 250, enabled = true } = {}) {
  const [count, setCount] = useState(enabled ? 0 : text.length);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(text.length);
      return undefined;
    }

    setCount(0);
    let written = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        written += 1;
        setCount(written);
        if (written >= text.length) clearInterval(interval);
      }, charMs);
    }, startMs);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, charMs, startMs, enabled, run]);

  const replay = useCallback(() => setRun((n) => n + 1), []);

  return { count, done: count >= text.length, replay };
}
