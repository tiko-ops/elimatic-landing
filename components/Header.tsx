import Link from "next/link";
import Wordmark from "./Wordmark";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[var(--header-h)] border-b border-ink/15 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Elimatic home" className="rounded-md">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-3 sm:gap-7">
          <Link
            href="/"
            className="rounded-md text-[13px] text-ink/75 sm:text-[14px] transition-colors hover:text-ink"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="rounded-md text-[13px] text-ink/75 sm:text-[14px] transition-colors hover:text-ink"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-3 py-1.5 text-[13px] sm:px-4 sm:py-2 font-medium whitespace-nowrap text-white transition-colors hover:bg-accent-hover focus-visible:rounded-full"
          >
            Request a demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
