import { cn, isExternalHref } from "../../utils/utils";

const variants = {
  primary: "bg-nb-ink text-nb-paper hover:opacity-90",
  ghost: "border border-nb-rule bg-nb-chip text-nb-ink hover:border-nb-ink",
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
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-150 active:scale-[0.98]",
    variants[variant],
    className
  );

  if (href) {
    const external = isExternalHref(href) && !href.startsWith("mailto:");

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
