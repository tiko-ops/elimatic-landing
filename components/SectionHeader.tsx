import type { ReactNode } from "react";

/** Mono label with a small accent square. */
export function Eyebrow({ children, className = "text-muted" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="h-[7px] w-[7px] bg-accent-vivid" />
      {children}
    </p>
  );
}

/**
 * Left-aligned section header: label and headline on the left,
 * supporting copy in the right column on wide screens.
 */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div data-reveal className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
      <div className="md:col-span-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="text-headline mt-5">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="max-w-[30rem] text-[17px] leading-relaxed text-muted md:col-span-5 md:pb-2 md:text-[19px]">
          {intro}
        </p>
      )}
    </div>
  );
}
