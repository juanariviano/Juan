import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "../content";
import useClock from "../hooks/useClock";
import useScrolled from "../hooks/useScrolled";
import { cn } from "../utils/utils";
import PulseDot from "./ui/PulseDot";
import ThemeToggle from "./ui/ThemeToggle";

const MORPH = "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

export default function Navigation() {
  const scrolled = useScrolled();
  const time = useClock(site.clock.timeZone);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 px-4 sm:px-6", MORPH, scrolled ? "pt-3" : "pt-5")}>
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex items-center justify-between gap-4 rounded-full border",
          MORPH,
          scrolled || open
            ? "max-w-[740px] border-nb-rule bg-nb-nav py-1.5 pl-5 pr-1.5 shadow-[0_10px_30px_-14px_var(--nb-shadow)] backdrop-blur-xl"
            : "max-w-[920px] border-transparent bg-transparent py-2 pl-1 pr-0"
        )}
      >
        <div className="hidden gap-5 font-mono text-[12.5px] sm:flex">
          {site.nav.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="py-1.5 text-nb-ink2 transition-colors hover:text-nb-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11.5px] text-nb-ink2 sm:ml-auto">
          <PulseDot />
          {time} {site.clock.label}
          <span className="max-[380px]:hidden">· {site.clock.city}</span>
        </span>

        <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-nb-ink2 hover:text-nb-ink sm:hidden"
          >
            {open ? <X size={19} /> : <List size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="mx-auto mt-2 max-w-[740px] overflow-hidden rounded-3xl border border-nb-rule bg-nb-nav backdrop-blur-xl sm:hidden"
            initial={reduce ? false : { opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col p-2 font-mono text-sm">
              {site.nav.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-nb-ink2 transition-colors hover:bg-nb-paper hover:text-nb-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
