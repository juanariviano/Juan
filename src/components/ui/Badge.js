import { cn } from "../../utils/utils";

const dotStyles = {
  light: "bg-[var(--ng-badge-dot-light)]",
  mid: "bg-[var(--ng-badge-dot-mid)]",
  muted: "bg-[var(--ng-badge-dot-muted)]",
};

export default function Badge({ label, dot = "light" }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ng-border2 bg-ng-surface px-3 py-1.5 text-[11px] font-medium text-ng-muted-l animate-fadeIn">
      <span
        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotStyles[dot])}
        aria-hidden
      />
      {label}
    </span>
  );
}
