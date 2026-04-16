import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Heston Automotive <enquiries@hestonautomotive.com>",
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject: `New Contact Enquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f8ff;padding:24px;border-radius:12px;">
          <div style="background:#101a56;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h2 style="color:#ffffff;margin:0;font-size:18px;">New Contact Enquiry</h2>
            <p style="color:#8a99d9;margin:4px 0 0;font-size:13px;">Heston Automotive Website</p>
          </div>
          <div style="background:#ffffff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e0ebff;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;width:130px;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Name</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:14px;color:#101a56;font-weight:600;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Email</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <a href="mailto:${email}" style="font-size:14px;color:#3f63ff;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Phone</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <a href="tel:${phone}" style="font-size:14px;color:#3f63ff;">${phone}</a>
                </td>
              </tr>` : ""}
              ${service ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Service</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f4fa;">
                  <span style="font-size:14px;color:#101a56;">${service}</span>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding:10px 0;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Message</span>
                </td>
                <td style="padding:10px 0;">
                  <p style="font-size:14px;color:#475569;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
                </td>
              </tr>
            </table>
            <div style="margin-top:20px;padding:12px 16px;background:#f4f8ff;border-radius:8px;border-left:3px solid #3f63ff;">
              <p style="margin:0;font-size:12px;color:#64748b;">Reply directly to this email to respond to <strong>${name}</strong>.</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
