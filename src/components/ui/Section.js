export default function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
