export default function FourDotMark({ className = '' }) {
  return (
    <span className={`four-dot-mark ${className}`} aria-hidden="true">
      <span className="dot dot-pink" />
      <span className="dot dot-blue" />
      <span className="dot dot-teal" />
      <span className="dot dot-violet" />
    </span>
  );
}
