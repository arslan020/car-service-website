import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/escape-html";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

function clip(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`quote:${clientIp(req.headers)}`)) {
      return NextResponse.json({ error: "Too many requests. Please call or try again shortly." }, { status: 429 });
    }

    const body = await req.json();
    const name = clip(body.name, 120);
    const phone = clip(body.phone, 40);
    const email = clip(body.email, 200);
    const reg = clip(body.reg, 12);
    const description = clip(body.description, 4000);

    if (!name || !phone || !description) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await resend.emails.send({
      from: "New Quote <notifications@mariestonservicecentre.co.uk>",
      to: process.env.CONTACT_TO!,
      replyTo: email || undefined,
      subject: `New Quote Request from ${name}${reg ? `, ${reg.toUpperCase()}` : ""}`.slice(0, 180),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f8ff;padding:24px;border-radius:12px;">
          <div style="background:#101a56;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h2 style="color:#ffffff;margin:0;font-size:18px;">New Quote Request</h2>
            <p style="color:#8a99d9;margin:4px 0 0;font-size:13px;">Marieston Service Centre Website</p>
          </div>
          <div style="background:#ffffff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e0ebff;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;width:130px;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Name</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:14px;color:#101a56;font-weight:600;">${escapeHtml(name)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Phone</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <a href="tel:${escapeHtml(phone)}" style="font-size:14px;color:#3f63ff;">${escapeHtml(phone)}</a>
                </td>
              </tr>
              ${email ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Email</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <a href="mailto:${escapeHtml(email)}" style="font-size:14px;color:#3f63ff;">${escapeHtml(email)}</a>
                </td>
              </tr>` : ""}
              ${reg ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Registration</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:16px;font-weight:800;color:#101a56;letter-spacing:0.1em;">${escapeHtml(reg.toUpperCase())}</span>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding:10px 0;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Description</span>
                </td>
                <td style="padding:10px 0;">
                  <p style="font-size:14px;color:#475569;line-height:1.6;margin:0;white-space:pre-wrap;">${escapeHtml(description)}</p>
                </td>
              </tr>
            </table>
            <div style="margin-top:20px;padding:12px 16px;background:#f4f8ff;border-radius:8px;border-left:3px solid #3f63ff;">
              <p style="margin:0;font-size:12px;color:#64748b;">Reply directly to this email to respond to <strong>${escapeHtml(name)}</strong>.</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote form error:", err);
    return NextResponse.json({ error: "Failed to send request. Please try again." }, { status: 500 });
  }
}
