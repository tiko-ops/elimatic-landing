/**
 * Minimal in-memory, fixed-window rate limiter.
 * Good enough for a single local/server instance. Swap for a shared store
 * (e.g. Redis/Upstash) when running on multiple serverless instances.
 */
type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();

  // Opportunistic cleanup so the map does not grow forever.
  if (buckets.size > 1000) {
    for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
  }

  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}
