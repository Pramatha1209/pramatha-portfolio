import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── In-Memory Rate Limiter ────────────────────────────────────────────────────
// Tracks request timestamps per IP. Resets when the serverless function cold-starts.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // max 5 emails per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Evict entries outside the window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  rateLimitMap.set(ip, recent);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

// ─── Sanitisation Helpers ──────────────────────────────────────────────────────
function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function isValidEmail(email: string): boolean {
  // RFC 5322-ish pattern — intentionally strict for a contact form
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ─── POST Handler ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // --- Rate limiting ---
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // --- Parse body ---
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, _honeypot } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      _honeypot?: string;
    };

    // --- Honeypot spam check (hidden field must be empty) ---
    if (_honeypot) {
      // Silently accept — don't reveal that it was caught
      return NextResponse.json({ success: true });
    }

    // --- Field validation ---
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Full Name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Full Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { error: "A valid Email Address is required." },
        { status: 400 }
      );
    }
    if (email.trim().length > 254) {
      return NextResponse.json(
        { error: "Email Address is too long." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 2) {
      return NextResponse.json(
        { error: "Subject is required (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (subject.trim().length > 200) {
      return NextResponse.json(
        { error: "Subject must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 10
    ) {
      return NextResponse.json(
        { error: "Message is required (minimum 10 characters)." },
        { status: 400 }
      );
    }
    if (message.trim().length > 5000) {
      return NextResponse.json(
        { error: "Message must be 5,000 characters or fewer." },
        { status: 400 }
      );
    }

    // --- Sanitise ---
    const cleanName = stripHtml(name.trim());
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = stripHtml(subject.trim());
    const cleanMessage = stripHtml(message.trim());

    // --- Check environment ---
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL || gmailUser;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars.");
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // --- Submission timestamp ---
    const submissionDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // --- Build email ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: contactEmail,
      replyTo: cleanEmail,
      subject: `[Portfolio Enquiry] ${cleanSubject}`,
      text: [
        `New Contact Form Submission`,
        `${"─".repeat(40)}`,
        ``,
        `Name:    ${cleanName}`,
        `Email:   ${cleanEmail}`,
        `Subject: ${cleanSubject}`,
        ``,
        `Message:`,
        `${cleanMessage}`,
        ``,
        `${"─".repeat(40)}`,
        `Submitted: ${submissionDate}`,
        ``,
        `— Sent from your portfolio contact form`,
      ].join("\n"),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #0a0b0e; color: #e5e5e5; border-radius: 12px;">
          <h2 style="color: #f59e0b; margin-top: 0; font-size: 20px;">New Portfolio Enquiry</h2>
          <hr style="border: none; border-top: 1px solid #222; margin: 16px 0;" />
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 12px; color: #a3a3a3; white-space: nowrap; vertical-align: top;">Name</td>
              <td style="padding: 8px 12px; color: #ffffff; font-weight: 600;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #a3a3a3; white-space: nowrap; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${cleanEmail}" style="color: #38bdf8; text-decoration: none;">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #a3a3a3; white-space: nowrap; vertical-align: top;">Subject</td>
              <td style="padding: 8px 12px; color: #ffffff;">${cleanSubject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #a3a3a3; white-space: nowrap; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; color: #ffffff; line-height: 1.6;">${cleanMessage.replace(/\n/g, "<br />")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #a3a3a3; white-space: nowrap; vertical-align: top;">Submitted</td>
              <td style="padding: 8px 12px; color: #a3a3a3; font-size: 13px;">${submissionDate}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #222; margin: 16px 0;" />
          <p style="font-size: 12px; color: #525252; margin-bottom: 0;">Sent from your portfolio contact form — <a href="https://pramatha-portfolio.vercel.app" style="color: #525252;">pramatha-portfolio.vercel.app</a></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
