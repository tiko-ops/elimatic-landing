"use client";

import { useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { LIMITS, validateDemoRequest, type DemoRequest, type FieldErrors } from "@/lib/validation";
import { Check } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

type FieldDef = {
  name: keyof DemoRequest;
  label: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  multiline?: boolean;
};

const FIELDS: FieldDef[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", autoComplete: "email" },
  { name: "company", label: "Company", autoComplete: "organization" },
  { name: "role", label: "Role", autoComplete: "organization-title" },
  { name: "message", label: "Message", optional: true, multiline: true },
];

const EMPTY: DemoRequest = { name: "", email: "", company: "", role: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState<DemoRequest>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [attempted, setAttempted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function update(name: keyof DemoRequest, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (attempted) setErrors(validateDemoRequest(next).errors);
  }

  function focusFirstError(errs: FieldErrors) {
    const first = FIELDS.find((f) => errs[f.name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setAttempted(true);
    setFormError("");
    const { errors: clientErrors } = validateDemoRequest(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      focusFirstError(clientErrors);
      return;
    }

    const honeypot = new FormData(e.currentTarget).get("website");

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot ?? "" }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
      };

      if (res.ok && json.ok) {
        setStatus("success");
        setValues(EMPTY);
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      if (json.fields) {
        setErrors(json.fields);
        focusFirstError(json.fields);
      }
      setFormError(json.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("We could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center text-center outline-none"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
          <Check aria-hidden="true" weight="bold" className="h-6 w-6" />
        </span>
        <h2 className="mt-6 text-[28px] font-semibold tracking-[-0.02em]">Thank you.</h2>
        <p className="mt-2 max-w-[22rem] text-[17px] leading-relaxed text-muted">
          Your request is in. We will be in touch soon to set up your demo.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setAttempted(false);
            setErrors({});
          }}
          className="mt-8 rounded-md text-[15px] text-accent hover:underline hover:underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const id = `field-${f.name}`;
          const error = errors[f.name];
          const errorId = `${id}-error`;
          const common = {
            id,
            name: f.name,
            value: values[f.name],
            maxLength: LIMITS[f.name],
            required: !f.optional,
            "aria-required": !f.optional || undefined,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
            disabled: submitting,
            className: `w-full rounded-xl border bg-white px-4 py-3 text-[17px] text-ink placeholder:text-muted/70 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent focus-visible:rounded-xl disabled:opacity-60 ${
              error ? "border-danger" : "border-ink/20 hover:border-ink/40"
            }`,
          };

          return (
            <div key={f.name} className={f.multiline ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="mb-1.5 block text-[14px] font-medium text-ink">
                {f.label}
                {f.optional && <span className="font-normal text-muted"> (optional)</span>}
              </label>
              {f.multiline ? (
                <textarea
                  {...common}
                  rows={4}
                  onChange={(e) => update(f.name, e.target.value)}
                  className={`${common.className} resize-y`}
                />
              ) : (
                <input
                  {...common}
                  type={f.type ?? "text"}
                  autoComplete={f.autoComplete}
                  onChange={(e) => update(f.name, e.target.value)}
                />
              )}
              {error && (
                <p id={errorId} className="mt-1.5 text-[13px] text-danger">
                  {error}
                </p>
              )}
            </div>
          );
        })}

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor="field-website">Website</label>
          <input id="field-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {formError && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-danger/25 bg-white px-4 py-3 text-[15px] text-danger"
        >
          {formError}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-[13px] text-muted">
          We only use your details to respond to this request. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-[17px] font-medium text-white transition-colors hover:bg-accent-hover focus-visible:rounded-full disabled:cursor-wait disabled:opacity-70"
        >
          {submitting && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {submitting ? "Sending…" : "Request a demo"}
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your request." : ""}
      </p>
      <noscript>
        <p className="mt-4 text-[13px] text-muted">
          This form needs JavaScript. You can also email us at {site.contactEmail}.
        </p>
      </noscript>
    </form>
  );
}
