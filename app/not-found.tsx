import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60svh] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-title">This page could not be found.</h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-[17px] font-medium text-white transition-colors hover:bg-accent-hover focus-visible:rounded-full"
      >
        Back to home
      </Link>
    </section>
  );
}
