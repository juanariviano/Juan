export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/** Resolve a path under public/ (works with GitHub Pages homepage prefix). */
export function publicUrl(path) {
  const base = process.env.PUBLIC_URL || "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function isExternalHref(href) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:");
}
