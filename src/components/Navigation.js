import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { cn, scrollToId } from "../utils/utils";
import ThemeToggle from "./ui/ThemeToggle";

const links = [
  { id: "about", label: "about" },
  { id: "exp", label: "experience" },
  { id: "work", label: "work" },
  { id: "cta", label: "contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const handleNav = (id) => {
    scrollToId(id);
    setOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-ng-border backdrop-blur-md transition-colors duration-200"
      style={{ backgroundColor: "var(--ng-nav-bg)" }}
    >
      <div className="section-px flex items-center justify-between py-4">
        <span className="text-[15px] font-semibold tracking-tight text-ng-fg">
          juan<span className="text-ng-muted">.</span>
        </span>

        <div className="hidden items-center gap-4 sm:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="cursor-pointer border-none bg-transparent text-xs text-ng-text2 transition-colors duration-150 hover:text-ng-fg"
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center border-none bg-transparent text-ng-text2"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-ng-border transition-all duration-200 sm:hidden",
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <div className="section-px flex flex-col gap-1 py-3">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="rounded-md px-2 py-2 text-left text-xs text-ng-text2 transition-colors hover:bg-ng-surface hover:text-ng-fg"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
