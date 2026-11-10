/** Il divisore col loto del listino: un loto al centro e due riccioli ai lati. */
export default function DivisoreLoto({ className = '' }: { className?: string }) {
  return (
    <div className={`divisore ${className}`} aria-hidden>
      <svg viewBox="0 0 260 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        {[undefined, 'matrix(-1 0 0 1 260 0)'].map((transform) => (
          <g key={transform ?? 'sinistra'} transform={transform}>
            <path d="M14 15h70c9 0 15-4 13-9-2-4-9-3-9 1 0 5 7 8 16 6" />
            <circle cx="8" cy="15" r="1.6" fill="currentColor" stroke="none" />
          </g>
        ))}
        <path d="M130 3.5c4 4 4.3 11 0 16.5-4.3-5.5-4-12.5 0-16.5Z" />
        <path d="M130 20c-6.2-.2-11-4.2-12-10.5 6.2.4 10.6 4.4 12 10.5Z" />
        <path d="M130 20c6.2-.2 11-4.2 12-10.5-6.2.4-10.6 4.4-12 10.5Z" />
        <path d="M129.5 21.5c-7 1-13.2-1-17-5.2 6.4-1.6 12.4.4 17 5.2ZM130.5 21.5c7 1 13.2-1 17-5.2-6.4-1.6-12.4.4-17 5.2Z" />
      </svg>
    </div>
  );
}
