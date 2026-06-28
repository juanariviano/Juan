import { cn, isExternalHref } from "../../utils/utils";

const variants = {
  primary:
    "bg-ng-accent text-ng-accent-fg hover:opacity-90 active:scale-[0.98]",
  ghost:
    "bg-transparent text-ng-text2 border border-ng-border2 hover:text-ng-fg hover:border-ng-border2 active:scale-[0.98]",
  social:
    "bg-transparent text-ng-text2 border border-ng-border2 hover:text-ng-fg hover:border-ng-border2 text-xs px-4 py-2 rounded-md active:scale-[0.98]",
};

export default function Button({
  variant = "primary",
  className,
  children,
  href,
  download,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg text-[13px] font-medium transition-all duration-150 px-5 py-[11px]",
    variants[variant],
    className
  );

  if (href) {
    const external = isExternalHref(href);

    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
