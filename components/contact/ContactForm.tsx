"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { ContactIntent } from "@/lib/contact-intent";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const inputClassName =
  "w-full rounded-xl border border-[#e2e2e6] bg-white px-4 py-3.5 text-base text-heading placeholder-para/80 transition-colors focus:border-cta focus:outline-none focus:ring-2 focus:ring-cta/20";

/**
 * Contact form — fields match what the old insightscurry.com/contact-us
 * page collected (Name, Email, Company, Designation, Message, all
 * required). Submits to app/api/contact/route.ts, which sends the
 * message via Resend. The old page's visible captcha is replaced with an
 * invisible honeypot field (see the hidden "website" input below) instead
 * of a visible challenge, per Swarn's call.
 */
export function ContactForm({
  intent,
  cta,
}: {
  intent: ContactIntent;
  cta: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const okButtonRef = useRef<HTMLButtonElement>(null);
  const showSuccess = status === "success";

  // Success popup: focus the OK button when it opens, close on Escape.
  useEffect(() => {
    if (!showSuccess) return;
    okButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStatus("idle");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showSuccess]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      designation: String(data.get("designation") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
      // Which button brought the visitor here — drives the email subject.
      intent,
      cta,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          result.error || "Something went wrong. Please try again."
        );
        return;
      }

      // GA4 conversion — mark "generate_lead" as a key event in GA4 Admin.
      trackEvent("generate_lead", { request_type: intent, cta });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please check your connection and try again."
      );
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mobile-center-off space-y-4" noValidate>
        {/* Honeypot — visually hidden and out of the tab order. A bot that
          fills every field on the page fills this one too; a real visitor
          never sees it. If it comes back non-empty, the API route silently
          drops the submission. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
        >
          <label htmlFor="website">Leave this field empty</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Name*"
            aria-label="Name"
            autoComplete="name"
            required
            className={inputClassName}
          />
          <input
            type="email"
            name="email"
            placeholder="Work email*"
            aria-label="Email"
            autoComplete="email"
            required
            className={inputClassName}
          />
          <input
            type="text"
            name="company"
            placeholder="Company*"
            aria-label="Company"
            autoComplete="organization"
            required
            className={inputClassName}
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation*"
            aria-label="Designation"
            autoComplete="organization-title"
            required
            className={inputClassName}
          />
        </div>
        <textarea
          name="message"
          placeholder="How can we help?*"
          aria-label="Message"
          required
          rows={5}
          className={`${inputClassName} resize-y`}
        />

        {status === "error" && (
          <p role="alert" className="text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-cta px-8 py-3.5 text-lg font-medium text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <span>{status === "submitting" ? "Sending…" : "Submit"}</span>
          <svg
            className="h-6 w-6 shrink-0"
            viewBox="0 0 30 30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.175 16H7V14H19.175L13.575 8.4L15 7L23 15L15 23L13.575 21.6L19.175 16Z" />
          </svg>
        </button>
      </form>

      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-heading/50 px-4 backdrop-blur-sm"
          onClick={() => setStatus("idle")}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-text"
            className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cta/10">
              <svg
                className="h-8 w-8 text-cta"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2
              id="contact-success-title"
              className="mb-2 text-2xl font-semibold text-heading"
            >
              Thanks — message sent.
            </h2>
            <p id="contact-success-text" className="mb-8 text-para">
              Someone from our team will get back to you shortly.
            </p>
            <button
              ref={okButtonRef}
              type="button"
              onClick={() => setStatus("idle")}
              className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-cta px-8 py-3 text-lg font-medium text-white transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
