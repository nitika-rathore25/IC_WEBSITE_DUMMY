import { CONTACT_INTENTS, type ContactIntent } from "@/lib/contact-intent";

export interface ContactEmailData {
  intent: ContactIntent;
  cta: string;
  name: string;
  email: string;
  company: string;
  designation: string;
  message: string;
}

/**
 * The logo is attached to the email inline (cid:) rather than linked, so
 * it shows even before the site is live and isn't blocked as a remote
 * image. PNG because Gmail/Outlook don't render SVG.
 */
export const EMAIL_LOGO_CID = "insightscurry-logo";

// Website theme colours (app/globals.css). Email clients ignore CSS
// variables and <style> blocks, so everything below is inline and table-based.
const CTA = "#e85c0d";
const CTA_TINT = "#fdeee6";
const NAVY = "#052c5a";
const HEADING = "#141414";
const PARA = "#7d7e80";
const SURFACE = "#f5f5f7";
const BORDER = "#ebebed";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** e.g. "Demo Request: Book a Demo — Jane Doe, Acme" */
export function contactEmailSubject(data: ContactEmailData) {
  const { subject, label } = CONTACT_INTENTS[data.intent];
  const button = data.cta && data.cta !== label ? `: ${data.cta}` : "";
  return `${subject}${button} — ${data.name}, ${data.company}`;
}

// Two tiles per row on desktop, stacking to one per row on narrow screens
// ("fluid hybrid" layout: inline-block tiles inside a font-size:0 cell,
// so it works without media queries, which many clients strip).
function tile(label: string, valueHtml: string) {
  return `<div class="tile" style="display:inline-block;width:100%;max-width:330px;vertical-align:top;">
    <div style="margin:6px;padding:16px 20px;background:${SURFACE};border:1px solid ${BORDER};border-radius:12px;">
      <div style="font:600 11px/16px ${FONT};letter-spacing:0.08em;text-transform:uppercase;color:${CTA};">${label}</div>
      <div style="margin-top:6px;font:500 16px/24px ${FONT};color:${HEADING};word-break:break-word;">${valueHtml}</div>
    </div>
  </div>`;
}

export function contactEmailHtml(data: ContactEmailData) {
  const intent = CONTACT_INTENTS[data.intent];
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const company = escapeHtml(data.company);
  const designation = escapeHtml(data.designation);
  const submittedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
  const link = (href: string, text: string) =>
    `<a href="${href}" style="color:${NAVY};text-decoration:none;">${text}</a>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<style>@media (max-width:620px){.tile{max-width:100%!important;}.hdr{display:block!important;width:100%!important;text-align:left!important;}.hdr-badge{padding-top:16px!important;}}</style>
<title>${escapeHtml(intent.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${SURFACE};">
<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(intent.subject)} from ${name}, ${company}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SURFACE};">
  <tr><td align="center" style="padding:32px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:720px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(5,44,90,0.08);">

      <tr><td style="padding:24px 36px;border-bottom:3px solid ${CTA};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td class="hdr" style="vertical-align:middle;"><img src="cid:${EMAIL_LOGO_CID}" width="180" height="39" alt="Insights Curry" style="display:block;border:0;width:180px;height:auto;" /></td>
          <td class="hdr hdr-badge" align="right" style="vertical-align:middle;"><span style="display:inline-block;padding:7px 16px;border-radius:999px;background:${CTA_TINT};font:600 12px/16px ${FONT};letter-spacing:0.06em;text-transform:uppercase;color:${CTA};white-space:nowrap;">${escapeHtml(intent.label)}</span></td>
        </tr></table>
      </td></tr>

      <tr><td style="padding:36px 36px 20px;">
        <h1 style="margin:0;font:700 26px/34px ${FONT};color:${HEADING};">New ${escapeHtml(intent.subject)}</h1>
        <p style="margin:8px 0 0;font:400 16px/24px ${FONT};color:${PARA};">A visitor submitted the following details through the website contact form.</p>
      </td></tr>

      <tr><td style="padding:0 30px;font-size:0;">
        ${tile("Name", name)}
        ${tile("Email", link(`mailto:${email}`, email))}
        ${tile("Company", company)}
        ${tile("Designation", designation)}
        ${tile("Type", data.cta ? escapeHtml(data.cta) : escapeHtml(intent.label))}
        ${tile("Received", `${submittedAt} IST`)}
      </td></tr>

      <tr><td style="padding:24px 36px 40px;">
        <div style="font:600 11px/16px ${FONT};letter-spacing:0.08em;text-transform:uppercase;color:${CTA};">Message</div>
        <div style="margin-top:10px;padding:22px 26px;background:#ffffff;border:1px solid ${BORDER};border-left:4px solid ${CTA};border-radius:12px;font:400 16px/26px ${FONT};color:${HEADING};">${escapeHtml(data.message).replace(/\n/g, "<br />")}</div>
      </td></tr>

      <tr><td style="padding:18px 36px;background:${NAVY};font:400 13px/20px ${FONT};color:#c9d4e3;">
        Insights Curry &middot; Website contact form
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Plain-text version for clients that don't render HTML. */
export function contactEmailText(data: ContactEmailData) {
  const intent = CONTACT_INTENTS[data.intent];
  return [
    `New ${intent.subject}`,
    "",
    `Name:        ${data.name}`,
    `Email:       ${data.email}`,
    `Company:     ${data.company}`,
    `Designation: ${data.designation}`,
    `Type:        ${data.cta || intent.label}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}
