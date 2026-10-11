import { site } from "../content";
import { fillTemplate } from "../utils/utils";

export default function Footer() {
  const vars = { year: new Date().getFullYear() };

  return (
    <footer className="relative z-[1] mx-auto max-w-[920px] px-6 pb-10">
      <div className="flex flex-wrap justify-between gap-2 border-t border-dashed border-nb-rule pt-5 font-mono text-[11.5px] text-nb-ink3">
        <span>{fillTemplate(site.footer.left, vars)}</span>
        <span>{fillTemplate(site.footer.right, vars)}</span>
      </div>
    </footer>
  );
}
