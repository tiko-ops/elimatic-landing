"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { StackSimple } from "@phosphor-icons/react/dist/ssr";

/*
 * Illustrative only: no real units or figures.
 * Accumulated savings from a change = volume × saving per unit × time since the change.
 * Geometry is drawn in a 1000×400 viewBox stretched to the plot (preserveAspectRatio="none"),
 * so HTML labels and the handle can be placed with matching percentages.
 */
const W = 1000;
const H = 400;
const T_MIN = 0.02;
const T_MAX = 0.9;
const V_MIN = 0.2;

/**
 * The first change (size 1) sits on the draggable marker. Later changes follow it at
 * fixed offsets (o), so in "many changes" mode the marker means "when you start":
 * dragging moves the whole sequence, and changes pushed past the end drop out.
 */
const FIRST_SIZE = 1;
const LATER = [
  { o: 0.08, d: 0.7 },
  { o: 0.14, d: 0.5 },
  { o: 0.2, d: 0.9 },
  { o: 0.27, d: 0.55 },
  { o: 0.33, d: 0.6 },
  { o: 0.45, d: 0.8 },
  { o: 0.51, d: 0.5 },
  { o: 0.57, d: 0.65 },
  { o: 0.68, d: 0.75 },
];

// One fixed scale for both scenarios, so one change and many changes compare honestly.
const Y_MAX =
  (FIRST_SIZE * (1 - T_MIN) + LATER.reduce((sum, c) => sum + c.d * Math.max(0, 1 - T_MIN - c.o), 0)) * 1.08;
const GRID_STEP = 0.8;

type Mode = "one" | "many";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

export default function SavingsChart() {
  const [mode, setMode] = useState<Mode>("one");
  const [volume, setVolume] = useState(0.8);
  const [t0, setT0] = useState(0.12);
  const [k, setK] = useState(0); // 0 = one change, 1 = many changes (animated)
  const [drawn, setDrawn] = useState(false);
  const kRef = useRef(0);
  const plotRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Smoothly morph between modes.
  useEffect(() => {
    const target = mode === "many" ? 1 : 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = kRef.current;
    const duration = reduced ? 1 : 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const value = from + (target - from) * ease(p);
      kRef.current = value;
      setK(value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  // Draw the chart once when it first scrolls into view.
  useEffect(() => {
    const el = plotRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setDrawn(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const yMax = Y_MAX;

  const geo = useMemo(() => {
    const changes = [
      { t: t0, d: FIRST_SIZE, w: 1 },
      ...LATER.map((c) => ({ t: t0 + c.o, d: c.d, w: k })),
    ];

    const samples = new Set<number>();
    for (let i = 0; i <= 160; i++) samples.add(i / 160);
    // Only sample inside the visible timeline; changes pushed past the end are off-chart.
    changes.forEach((c) => {
      if (c.t > 0 && c.t < 1) samples.add(c.t);
    });
    const ts = [...samples].sort((a, b) => a - b);

    const x = (t: number) => (t * W).toFixed(2);
    const y = (s: number) => (H - (s / yMax) * H).toFixed(2);

    let lower = ts.map(() => 0);
    const bands = changes.map((c) => {
      const upper = ts.map((t, i) => lower[i] + volume * c.d * c.w * Math.max(0, t - c.t));
      const top = ts.map((t, i) => `${i ? "L" : "M"}${x(t)} ${y(upper[i])}`).join(" ");
      const bottom = ts
        .map((t, i) => [t, lower[i]] as const)
        .reverse()
        .map(([t, s]) => `L${x(t)} ${y(s)}`)
        .join(" ");
      const band = { area: `${top} ${bottom} Z`, top, end: upper[upper.length - 1] };
      lower = upper;
      return band;
    });

    // Outline of the full many-changes total, shown as a comparison in "one change" mode.
    const all = [{ t: t0, d: FIRST_SIZE }, ...LATER.map((c) => ({ t: t0 + c.o, d: c.d }))];
    const ghostValues = ts.map((t) =>
      all.reduce((sum, c) => sum + volume * c.d * Math.max(0, t - c.t), 0),
    );
    const ghost = ts.map((t, i) => `${i ? "L" : "M"}${x(t)} ${y(ghostValues[i])}`).join(" ");

    const total = bands[bands.length - 1].end;
    const first = bands[0].end;
    return {
      bands,
      total,
      first,
      ghost,
      ghostEnd: ghostValues[ghostValues.length - 1],
      topLine: bands[bands.length - 1].top,
    };
  }, [t0, k, volume, yMax]);

  const gridLines: number[] = [];
  for (let s = GRID_STEP; s < yMax; s += GRID_STEP) gridLines.push(s / yMax);

  // ----- Dragging the change point -----
  function setFromClientX(clientX: number) {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect) return;
    setT0(clamp((clientX - rect.left) / rect.width, T_MIN, T_MAX));
  }

  /*
   * Track the drag on the window rather than the element, and block the browser's
   * own text selection / native drag, which would otherwise cancel the pointer
   * stream mid-drag and leave the marker stuck.
   */
  const stopDrag = useRef<(() => void) | null>(null);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    stopDrag.current?.();
    dragging.current = true;
    setFromClientX(e.clientX);
    handleRef.current?.focus({ preventScroll: true });

    const pointerId = e.pointerId;
    const move = (ev: globalThis.PointerEvent) => {
      if (ev.pointerId === pointerId && dragging.current) setFromClientX(ev.clientX);
    };
    const end = (ev: globalThis.PointerEvent) => {
      if (ev.pointerId === pointerId) stop();
    };
    const stop = () => {
      dragging.current = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      stopDrag.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    stopDrag.current = stop;
  }

  useEffect(() => () => stopDrag.current?.(), []);

  function onHandleKey(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 0.1 : 0.02;
    const next: Record<string, (t: number) => number> = {
      ArrowLeft: (t) => t - step,
      ArrowDown: (t) => t - step,
      ArrowRight: (t) => t + step,
      ArrowUp: (t) => t + step,
      Home: () => T_MIN,
      End: () => T_MAX,
    };
    if (e.key in next) {
      e.preventDefault();
      setT0((t) => clamp(next[e.key](t), T_MIN, T_MAX));
    }
  }

  const firstH = geo.first / yMax;
  const totalH = geo.total / yMax;
  const timing = t0 < 0.3 ? "early" : t0 < 0.6 ? "midway" : "late";
  const volumeWord = volume > 0.66 ? "high" : volume > 0.4 ? "medium" : "low";

  const description =
    mode === "one"
      ? `Illustration: one change made ${timing}, at ${volumeWord} volume. Its savings grow steadily from the moment it is made.`
      : `Illustration: many changes over time, at ${volumeWord} volume. Each change adds a new layer, and the savings stack up.`;

  return (
    <div className="rounded-[24px] border border-ink/15 bg-white p-5 shadow-card sm:p-8 md:p-10">
      {/* Controls */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Scenario"
          className="inline-flex self-start rounded-full bg-surface p-1"
        >
          {(
            [
              ["one", "One change"],
              ["many", "Many changes"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`rounded-full px-4 py-2 text-[14px] font-medium transition-all duration-300 focus-visible:rounded-full ${
                mode === value
                  ? "bg-white text-ink shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                  : "text-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-[14px] text-muted">
          <span className="font-medium text-ink">Volume</span>
          <span aria-hidden="true">Low</span>
          <input
            type="range"
            min={V_MIN}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-valuetext={`${volumeWord} volume`}
            className="w-full min-w-0 flex-1 cursor-pointer accent-accent sm:w-44 sm:flex-none"
          />
          <span aria-hidden="true">High</span>
        </label>
      </div>

      {/* Chart */}
      <div className="mt-8 flex gap-3 sm:mt-10">
        <div className="relative flex-1">
          <div ref={plotRef} className="relative h-[240px] select-none sm:h-[320px] md:h-[360px]">
            {/* Grid (in data units) */}
            <div aria-hidden="true" className="absolute inset-0">
              {gridLines.map((g) => (
                <div
                  key={g}
                  className="absolute inset-x-0 h-px bg-ink/[0.08]"
                  style={{ bottom: pct(g) }}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 h-px bg-ink/25" />
            </div>

            <span aria-hidden="true" className="label absolute top-0 left-0 text-[11px] text-muted">
              Accumulated savings
            </span>

            {/* Bands. The description lives here (not on the whole plot) so the slider below stays accessible. */}
            <div
              role="img"
              aria-label={description}
              className="absolute inset-0 transition-[clip-path] duration-[1800ms] ease-[var(--ease-calm)]"
              style={{ clipPath: drawn ? "inset(-10% 0 0 0)" : "inset(-10% 100% 0 0)" }}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                {geo.bands.map((b, i) => (
                  <path
                    key={i}
                    d={b.area}
                    fill="#ef5f00"
                    fillOpacity={i === 0 ? 0.42 : i % 2 ? 0.2 : 0.13}
                  />
                ))}
                {geo.bands.slice(0, -1).map((b, i) => (
                  <path
                    key={`sep-${i}`}
                    d={b.top}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={1.25}
                    vectorEffect="non-scaling-stroke"
                    opacity={i === 0 ? 1 : k}
                  />
                ))}
                <path
                  d={geo.topLine}
                  fill="none"
                  stroke="#ef5f00"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={geo.ghost}
                  fill="none"
                  stroke="#ef5f00"
                  strokeOpacity={0.5}
                  strokeWidth={1.5}
                  strokeDasharray="5 6"
                  vectorEffect="non-scaling-stroke"
                  opacity={1 - k}
                />
              </svg>

              {/* In-chart labels */}
              {firstH > 0.12 && (
                <span
                  className="absolute right-2 text-[12px] font-semibold text-ink/80 sm:text-[13px]"
                  style={{ bottom: pct(firstH / 2), transform: "translateY(50%)" }}
                >
                  One change
                </span>
              )}
              {k > 0.6 && totalH - firstH > 0.2 && (
                <span
                  className="absolute right-2 text-[12px] font-semibold text-ink/70 sm:text-[13px]"
                  style={{
                    bottom: pct(firstH + (totalH - firstH) / 2),
                    transform: "translateY(50%)",
                    opacity: (k - 0.6) / 0.4,
                  }}
                >
                  More changes
                </span>
              )}
            </div>

            {/* "One change" mode: what many changes would add up to */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 text-[12px] font-medium whitespace-nowrap text-accent sm:text-[13px]"
              style={{
                bottom: `calc(${pct(geo.ghostEnd / yMax)} + 10px)`,
                opacity: drawn ? 1 - k : 0,
              }}
            >
              With many changes
            </div>

            {/* "Many changes" mode: total chip at the end of the line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0"
              style={{
                bottom: `calc(${pct(totalH)} + 10px)`,
                opacity: drawn ? k : 0,
              }}
            >
              <div className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-[13px] font-medium whitespace-nowrap text-ink shadow-[0_6px_24px_-8px_rgba(0,0,0,0.18)]">
                <StackSimple aria-hidden="true" weight="bold" className="h-3.5 w-3.5 text-accent" />
                Total savings
              </div>
            </div>

            {/*
              Each later change: a small tick on the time axis, and a dot on the total line
              where its saving starts. From that dot its layer opens up and the total climbs faster.
            */}
            {LATER.map((c) => {
              const t = t0 + c.o;
              const visible = t < 1;
              const totalAt = [{ t: t0, d: FIRST_SIZE, w: 1 }, ...LATER.map((l) => ({ t: t0 + l.o, d: l.d, w: k }))]
                .reduce((sum, x) => sum + volume * x.d * x.w * Math.max(0, t - x.t), 0);
              return (
                <span key={c.o} aria-hidden="true" className="pointer-events-none">
                  <span
                    className="absolute bottom-0 h-1.5 w-px -translate-x-1/2 bg-accent-vivid/60"
                    style={{ left: pct(Math.min(t, 1)), opacity: visible ? k : 0 }}
                  />
                  <span
                    className="absolute h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-accent-vivid bg-white"
                    style={{
                      left: pct(Math.min(t, 1)),
                      bottom: pct(totalAt / yMax),
                      opacity: visible ? k : 0,
                    }}
                  />
                </span>
              );
            })}

            {/* Drag surface */}
            <div
              aria-hidden="true"
              className="absolute inset-0 cursor-ew-resize touch-pan-y"
              draggable={false}
              onPointerDown={onPointerDown}
            />

            {/* Change line + handle */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-6 bottom-0 w-px -translate-x-1/2 border-l border-dashed border-accent/50"
              style={{ left: pct(t0) }}
            />
            <div
              ref={handleRef}
              role="slider"
              tabIndex={0}
              aria-label={mode === "one" ? "When the change is made" : "When you start finding changes"}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(t0 * 100)}
              aria-valuetext={mode === "one" ? `Change made ${timing}` : `Started ${timing}`}
              onKeyDown={onHandleKey}
              onPointerDown={onPointerDown}
              className="group absolute bottom-0 flex h-11 w-11 -translate-x-1/2 translate-y-1/2 cursor-grab touch-none items-center justify-center rounded-full outline-none active:cursor-grabbing"
              style={{ left: pct(t0) }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-accent shadow-[0_0_0_6px_rgba(239,95,0,0.15),0_4px_14px_rgba(239,95,0,0.35)] transition-transform duration-200 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-4">
                <span className="flex gap-[3px]">
                  <span className="h-2 w-px bg-white" />
                  <span className="h-2 w-px bg-white" />
                </span>
              </span>
            </div>
          </div>

          {/* X axis */}
          <div
            aria-hidden="true"
            className="label mt-7 flex items-center justify-between gap-4 text-[11px] text-muted"
          >
            <span>
              {mode === "one"
                ? "Drag the marker to move the change"
                : "Drag the marker to start earlier or later"}
            </span>
            <span className="hidden sm:inline">Time →</span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p aria-live="polite" className="mt-8 max-w-[40rem] text-[17px] leading-relaxed text-muted">
        {mode === "one" ? (
          <>
            <span className="font-semibold text-ink">One change saves on every unit.</span> Good,
            but small. The dashed line shows what many changes add up to.
          </>
        ) : (
          <>
            <span className="font-semibold text-ink">Elimatic keeps finding more.</span> Each change
            adds a new layer of savings, and they stack up over time.
          </>
        )}
      </p>
    </div>
  );
}
