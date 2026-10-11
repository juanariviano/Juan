import { Moon, Sun } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../utils/utils";

const OPTIONS = [
  { value: "light", label: "Light mode", Icon: Sun },
  { value: "dark", label: "Dark mode", Icon: Moon },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex gap-0.5 rounded-full border border-nb-rule p-[3px]"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className={cn(
              "relative inline-flex h-9 w-10 items-center justify-center rounded-full transition-colors duration-200",
              active ? "text-nb-paper" : "text-nb-ink3 hover:text-nb-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-nb-ink"
                transition={{ type: "spring", stiffness: 500, damping: 36 }}
              />
            )}
            <Icon size={16} className="relative" />
          </button>
        );
      })}
    </div>
  );
}
