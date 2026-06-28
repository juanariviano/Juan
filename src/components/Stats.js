import { profile } from "../data/profile";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 border-b border-ng-border sm:grid-cols-3">
      {profile.stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`px-5 py-7 text-center ${i < profile.stats.length - 1 ? "sm:border-r sm:border-ng-border" : ""}`}
        >
          <div className="mb-1 text-[32px] font-semibold tracking-tight">
            {stat.value}
            <span className="text-ng-muted">{stat.suffix}</span>
          </div>
          <div className="text-[11px] font-light leading-snug text-ng-text2">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
