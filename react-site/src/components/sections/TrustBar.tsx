export function TrustBar({ items }: { items: readonly string[] }) {
  return (
    <div className="trust-bar" aria-label="Practice features">
      <div>
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
