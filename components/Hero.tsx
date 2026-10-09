import Link from "next/link";
import HeroVisual from "./HeroVisual";
import LogoMarquee from "./sections/LogoMarquee";
import { ArrowRight, CaretRight } from "@phosphor-icons/react/dist/ssr";

const steps = ["Connect your data", "AI finds the savings", "You decide"];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto flex min-h-[calc(100svh-var(--header-h))] max-w-[1200px] flex-col px-4 pt-[clamp(1rem,3svh,2.5rem)] pb-[clamp(0.75rem,2svh,1.5rem)] sm:px-6"
    >
      <div className="flex flex-col items-center text-center">
        <h1
          id="hero-title"
          className="hero-rise text-display sm:mt-2"
          style={{ ["--d" as string]: "60ms" }}
        >
          Less cost.
          <br />
          Same quality.
          <span className="mt-[clamp(0.25rem,1svh,0.6rem)] block text-[0.38em] leading-tight tracking-[-0.02em] text-accent">
            With AI.
          </span>
        </h1>

        <p
          className="hero-rise mt-[clamp(0.875rem,2.2svh,1.5rem)] max-w-[40rem] text-[17px] leading-[1.45] text-balance text-muted sm:text-[21px] sm:leading-[1.4]"
          style={{ ["--d" as string]: "180ms" }}
        >
          Put in your engineering data. Elimatic returns the cost impact, the savings and lower-cost alternatives, instantly.
        </p>

        <div
          className="hero-rise mt-[clamp(1rem,2.4svh,1.75rem)] flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          style={{ ["--d" as string]: "260ms" }}
        >
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-3 text-[17px] font-medium text-white transition-colors hover:bg-accent-hover focus-visible:rounded-full"
          >
            Request a demo
          </Link>
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-0.5 rounded-md text-[17px] text-accent"
          >
            <span className="group-hover:underline group-hover:underline-offset-4">
              See how it works
            </span>
            <CaretRight
              aria-hidden="true"
              weight="bold"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <ol
          aria-label="How Elimatic works"
          className="hero-rise mt-[clamp(1rem,2.6svh,2rem)] grid w-full max-w-[24rem] grid-cols-3 text-[13px] leading-snug sm:flex sm:max-w-none sm:items-center sm:justify-center sm:text-[14px]"
          style={{ ["--d" as string]: "340ms" }}
        >
          {steps.map((step, i) => (
            <li
              key={step}
              className="relative flex flex-col items-center gap-1.5 px-1 sm:flex-row sm:gap-2.5 sm:px-0"
            >
              {i > 0 && (
                <>
                  {/* connector: phones (between numerals) */}
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-[calc(50%+20px)] h-px w-[calc(100%-40px)] bg-ink/25 sm:hidden"
                  />
                  {/* connector: larger screens (inline) */}
                  <ArrowRight
                    aria-hidden="true"
                    weight="light"
                    className="mx-4 hidden h-4 w-4 text-ink/60 sm:block"
                  />
                </>
              )}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-ink/15 font-mono text-[11px] font-medium text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-ink/80">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-[clamp(1rem,2.5svh,2rem)] flex min-h-[170px] flex-1 items-stretch justify-center">
        <div className="flex max-h-[300px] w-full max-w-[960px] sm:max-h-[360px]">
          <HeroVisual />
        </div>
      </div>

      <LogoMarquee compact />
    </section>
  );
}
