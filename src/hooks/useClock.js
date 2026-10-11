import { useCallback, useEffect, useState } from "react";

/** Current HH:MM in the given IANA time zone, refreshed every 15 seconds. */
export default function useClock(timeZone) {
  const format = useCallback(() => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
    } catch {
      return "--:--";
    }
  }, [timeZone]);

  const [time, setTime] = useState(format);

  useEffect(() => {
    setTime(format());
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  }, [format]);

  return time;
}
