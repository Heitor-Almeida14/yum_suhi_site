interface MonogramProps {
  className?: string;
}

/**
 * Monograma "Y" do Yum Sushi — círculo jade com par de hashis.
 */
export function Monogram({ className = "h-11 w-11" }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Monograma Yum Sushi"
      fill="none"
    >
      <circle cx="32" cy="32" r="30.5" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
      <circle cx="32" cy="32" r="26.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path
        d="M21 20l11 13v11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path d="M43 20L32 33" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M26 45h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" opacity="0.7" />
    </svg>
  );
}

interface WordmarkProps {
  className?: string;
  subclassName?: string;
}

/**
 * Logotipo completo: monograma + nome espaçado + subtítulo.
 */
export function Wordmark({ className = "", subclassName = "" }: WordmarkProps) {
  return (
    <span className={`flex items-center gap-4 ${className}`}>
      <Monogram className="h-11 w-11 shrink-0 text-gold" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.4rem] font-semibold tracking-[0.22em] text-ivory">
          YUM SUSHI
        </span>
        <span
          className={`mt-1.5 text-[0.55rem] font-medium tracking-[0.42em] text-gold/80 uppercase ${subclassName}`}
        >
          Rodízio Japonês · SP
        </span>
      </span>
    </span>
  );
}
