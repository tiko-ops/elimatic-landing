import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";
import { validateDemoRequest, type DemoRequest } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.jsonl");

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "local";
}

async function saveSubmission(entry: Record<string, unknown>) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(SUBMISSIONS_FILE, JSON.stringify(entry) + "\n", "utf8");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Emails each request to the company inbox through the company's own mailbox (SMTP),
 * e.g. one.com: send.one.com, port 465, login contact@elimatic.se + its password.
 * Only runs when SMTP_HOST, SMTP_USER and SMTP_PASS are set; otherwise a no-op.
 */
async function maybeSendEmail(data: DemoRequest): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL; 587 upgrades with STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Role", data.role],
    ["Message", data.message || "—"],
  ];

  await transporter.sendMail({
    from: `"Elimatic website" <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL || site.contactEmail,
    replyTo: data.email,
    subject: `Demo request: ${data.name}, ${data.company}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: rows
      .map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v).replace(/\n/g, "<br>")}</p>`)
      .join(""),
  });
  return true;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const MAX_BYTES = 16 * 1024;
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    console.warn("[contact] Honeypot triggered, submission discarded.");
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateDemoRequest(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: errors },
      { status: 422 },
    );
  }

  const entry = { receivedAt: new Date().toISOString(), ...data };

  console.log("[contact] New demo request:", entry);

  // Save to file (works locally; most hosts have no writable disk) and email it.
  // The request succeeds if at least one of the two worked.
  let saved = false;
  try {
    await saveSubmission(entry);
    saved = true;
  } catch (err) {
    console.error("[contact] Could not save submission to file:", err);
  }

  let emailed = false;
  try {
    emailed = await maybeSendEmail(data);
  } catch (err) {
    console.error("[contact] Email delivery failed:", err);
  }

  if (!saved && !emailed) {
    return NextResponse.json(
      { ok: false, error: `Something went wrong on our side. Please email us at ${site.contactEmail}.` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
