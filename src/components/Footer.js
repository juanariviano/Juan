import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="section-px flex flex-col items-center justify-between gap-2 border-t border-ng-border py-4 text-[11px] text-ng-text3 sm:flex-row">
      <span>© {new Date().getFullYear()} · {profile.domain}</span>
      <span>{profile.location}</span>
    </footer>
  );
}
