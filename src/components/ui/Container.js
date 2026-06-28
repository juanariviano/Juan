export default function Container({ children, className = "" }) {
  return (
    <div className={`w-full section-px ${className}`}>
      {children}
    </div>
  );
}
