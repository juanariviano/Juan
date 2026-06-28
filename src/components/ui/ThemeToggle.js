import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../utils/utils";

export default function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border border-ng-border2 bg-ng-surface text-ng-text2 transition-colors duration-150 hover:border-ng-border2 hover:bg-ng-surface-hover hover:text-ng-fg",
        className
      )}
    >
      {isDark ? <Sun size={16} weight="regular" /> : <Moon size={16} weight="regular" />}
    </button>
  );
}
