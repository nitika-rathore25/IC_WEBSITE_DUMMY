import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isContactIntent } from "@/lib/contact-intent";
import { EMAIL_LOGO_PNG_BASE64 } from "@/lib/email/logo";
import {
  EMAIL_LOGO_CID,
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
} from "@/lib/email/contact-email";

// Defaults used when CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL aren't set.
// insightscurry.com is verified in Resend, so it can be the sender.
const DEFAULT_FROM = "Insights Curry Website <support@insightscurry.com>";
const DEFAULT_TO = "nitika.rathore@knowledgeexcel.com";

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  designation: string;
  message: string;
  // Honeypot — real visitors never see or fill this field. A bot that
  // fills every input it finds will fill it, which is how we catch it.
  website?: string;
  // Which button the visitor clicked to reach the contact page.
  intent?: string;
  cta?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot tripped — report success without actually sending anything,
  // so the bot doesn't learn its submission was rejected.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, company, designation, message } = body;
  const intent = isContactIntent(body.intent) ? body.intent : "team";
  const cta = typeof body.cta === "string" ? body.cta.trim().slice(0, 150) : "";

  if (
    !name?.trim() ||
    !email?.trim() ||
    !company?.trim() ||
    !designation?.trim() ||
    !message?.trim()
  ) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Comma-separate CONTACT_TO_EMAIL to send to more than one inbox.
  const toAddress = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;

  if (!apiKey) {
    // Not configured yet (missing RESEND_API_KEY in .env.local / .env.production)
    // — fail loudly in the server log, politely to the visitor.
    console.error(
      "Contact form submission received but RESEND_API_KEY is missing."
    );
    return NextResponse.json(
      {
        error:
          "The contact form isn't fully set up yet. Please email us directly instead.",
      },
      { status: 503 }
    );
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  const resend = new Resend(apiKey);
  const emailData = {
    intent,
    cta,
    name: name.trim(),
    email: email.trim(),
    company: company.trim(),
    designation: designation.trim(),
    message: message.trim(),
  };

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress.split(",").map((addr) => addr.trim()),
      replyTo: email,
      subject: contactEmailSubject(emailData),
      html: contactEmailHtml(emailData),
      text: contactEmailText(emailData),
      attachments: [
        {
          filename: "insightscurry-logo.png",
          content: Buffer.from(EMAIL_LOGO_PNG_BASE64, "base64"),
          inlineContentId: EMAIL_LOGO_CID,
        },
      ],
    });

    if (error) {
      console.error("Resend failed to send contact form email:", error);
      return NextResponse.json(
        {
          error: "Something went wrong sending your message. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending contact form email:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
