/** Brand mark: a cost line stepping down to a settled point. Same shape as the favicon. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <rect width="24" height="24" rx="6" fill="#21201c" />
      <path
        d="M5 7.5h3.2c1.2 0 1.4 4 2.6 4h2.4c1.2 0 1.4 4.5 2.6 4.5H19"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.8" cy="16" r="1.9" fill="#f76b15" />
    </svg>
  );
}

export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-ink ${className}`}>
      <BrandMark className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
      <span className="text-[17px] font-[680] sm:text-[18px] tracking-[-0.03em] [font-stretch:112%]">
        Elimatic
      </span>
    </span>
  );
}
