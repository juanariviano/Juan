export default function PulseDot() {
  return (
    <span className="relative inline-flex h-[7px] w-[7px] flex-none" aria-hidden="true">
      <span className="absolute inset-0 animate-ping rounded-full bg-nb-ink" />
      <span className="relative h-[7px] w-[7px] rounded-full bg-nb-ink" />
    </span>
  );
}
