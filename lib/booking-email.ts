import { Resend } from "resend";
import { site } from "./site-config";
import { SERVICE_TYPES } from "./booking-data";

const resend = new Resend(process.env.RESEND_API_KEY);

const SERVICE_DURATIONS: Record<string, number> = {
  mot: 60, full: 180, interim: 120, major: 240, oil: 45,
  brakes: 90, clutch: 180, suspension: 120, exhaust: 60,
  engine: 120, electrical: 90, diagnostics: 60, tyres: 45,
  ac: 60, battery: 30, general: 90, mot_service: 120,
  timing: 120, dpf: 90, ppi: 60, seasonal: 45, fleet: 120,
};

function addMins(time: string, mins: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + mins;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function durationLabel(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h}h`;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export interface BookingEmailData {
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  reg: string;
  make?: string | null;
  model?: string | null;
  year?: string | null;
  fuelType?: string | null;
  colour?: string | null;
  engineSize?: string | null;
  mileage?: string | null;
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  const durationMins = SERVICE_DURATIONS[data.serviceType] ?? 90;
  const endTime = addMins(data.appointmentTime, durationMins);
  const duration = durationLabel(durationMins);
  const serviceLabel = SERVICE_TYPES.find(s => s.id === data.serviceType)?.label ?? data.serviceType;

  const apptDate = new Date(data.appointmentDate + "T00:00:00");
  const dayOfWeek = apptDate.toLocaleDateString("en-GB", { weekday: "long" });
  const dateFormatted = apptDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });

  const eventTitle = encodeURIComponent(`${serviceLabel} - ${data.reg}`);
  const eventDesc = encodeURIComponent(`Ref: ${data.reference} | ${data.make ?? ""} ${data.model ?? ""} (${data.reg}) | ${serviceLabel}`);
  const eventLoc = encodeURIComponent(site.addressLines.join(", "));
  const startFlat = `${data.appointmentDate.replace(/-/g, "")}T${data.appointmentTime.replace(":", "")}00`;
  const endFlat   = `${data.appointmentDate.replace(/-/g, "")}T${endTime.replace(":", "")}00`;
  const startISO  = `${data.appointmentDate}T${data.appointmentTime}:00`;
  const endISO    = `${data.appointmentDate}T${endTime}:00`;

  const googleUrl    = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startFlat}/${endFlat}&details=${eventDesc}&location=${eventLoc}`;
  const outlookUrl   = `https://outlook.live.com/calendar/action/compose?subject=${eventTitle}&startdt=${startISO}&enddt=${endISO}&body=${eventDesc}&location=${eventLoc}&allday=false&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;
  const office365Url = `https://outlook.office.com/calendar/action/compose?subject=${eventTitle}&startdt=${startISO}&enddt=${endISO}&body=${eventDesc}&location=${eventLoc}&allday=false&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;
  const yahooUrl     = `https://calendar.yahoo.com/?v=60&title=${eventTitle}&st=${startFlat}&et=${endFlat}&desc=${eventDesc}&in_loc=${eventLoc}`;

  // Vehicle detail rows
  const vehicleRowItems = [
    data.make && data.model ? { label: "Vehicle", value: `<strong style="color:#101a56;font-weight:700;">${data.make} ${data.model}</strong>` } : null,
    data.year        ? { label: "Year",    value: data.year } : null,
    data.fuelType    ? { label: "Fuel",    value: data.fuelType } : null,
    data.colour      ? { label: "Colour",  value: data.colour } : null,
    data.engineSize  ? { label: "Engine",  value: `${data.engineSize} cc` } : null,
    data.mileage     ? { label: "Mileage", value: `${parseInt(data.mileage).toLocaleString("en-GB")} miles` } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const vehicleRows = vehicleRowItems.map((row, i) => {
    const isLast = i === vehicleRowItems.length - 1;
    const border = isLast ? "" : "border-bottom:1px solid #f0f4fa;";
    return `
      <tr>
        <td style="padding:7px 0;${border}font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;width:80px;">${row.label}</td>
        <td style="padding:7px 0;${border}font-size:13px;color:#475569;">${row.value}</td>
      </tr>`;
  }).join("");

  const btnStyle = `display:inline-block;padding:9px 20px;background:#ffffff;border:1px solid #d0dcea;border-radius:8px;font-size:13px;font-weight:600;color:#101a56;text-decoration:none;`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Booking Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#eef2f8;font-family:Arial,Helvetica,sans-serif;">

<!-- Outer wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef2f8;">
  <tr>
    <td align="center" style="padding:24px 0 40px;">

      <!-- Card -->
      <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;width:100%;">

        <!-- ── HEADER ── -->
        <tr>
          <td style="background:#101a56;border-radius:12px 12px 0 0;padding:28px 32px;">
            <img src="https://hestonautomotive.com/business-logo.png"
                 alt="Heston Automotive"
                 width="160"
                 style="display:block;height:auto;max-height:52px;width:auto;filter:brightness(0) invert(1);-webkit-filter:brightness(0) invert(1);">
            <p style="margin:10px 0 0;font-size:13px;color:#8a99d9;">${site.addressLines.join(", ")} &nbsp;&bull;&nbsp; ${site.phoneDisplay}</p>
          </td>
        </tr>

        <!-- ── GREEN BANNER ── -->
        <tr>
          <td style="background:#ecfdf5;border-left:1px solid #a7f3d0;border-right:1px solid #a7f3d0;border-bottom:1px solid #a7f3d0;padding:16px 32px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="44" valign="top">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="36" height="36" align="center" valign="middle"
                          style="background:#10b981;border-radius:50%;font-size:20px;font-weight:900;color:#ffffff;line-height:36px;">
                        &#10003;
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" style="padding-left:12px;">
                  <p style="margin:0;font-size:15px;font-weight:700;color:#065f46;">Your appointment has been confirmed!</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#047857;line-height:1.5;">We look forward to seeing you. If you have any questions or need to make changes, feel free to contact us.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── APPOINTMENT DETAILS ── -->
        <tr>
          <td style="background:#f8fafc;border-left:1px solid #e0ebff;border-right:1px solid #e0ebff;border-bottom:1px solid #e8edf5;padding:10px 32px;">
            <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">Appointment Details</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;border-left:1px solid #e0ebff;border-right:1px solid #e0ebff;border-bottom:1px solid #e0ebff;padding:16px 32px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="padding:7px 0;border-bottom:1px solid #f0f4fa;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;width:140px;">Appointment</td>
                <td style="padding:7px 0;border-bottom:1px solid #f0f4fa;font-size:14px;color:#101a56;font-weight:600;">${serviceLabel}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;border-bottom:1px solid #f0f4fa;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Date &amp; Time</td>
                <td style="padding:7px 0;border-bottom:1px solid #f0f4fa;font-size:14px;color:#101a56;font-weight:600;">${dateFormatted} (${dayOfWeek}) at ${data.appointmentTime}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;border-bottom:1px solid #f0f4fa;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Est. End Time</td>
                <td style="padding:7px 0;border-bottom:1px solid #f0f4fa;font-size:13px;color:#475569;">${endTime} &nbsp;<span style="color:#cbd5e1;">|</span>&nbsp; Duration: ${duration}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Reference</td>
                <td style="padding:7px 0;font-size:15px;font-weight:700;color:#101a56;">${data.reference}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── YOUR DETAILS + VEHICLE DETAILS (two columns) ── -->
        <tr>
          <td style="background:#ffffff;border-left:1px solid #e0ebff;border-right:1px solid #e0ebff;border-bottom:1px solid #e0ebff;padding:0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <!-- YOUR DETAILS column -->
                <td width="50%" valign="top" style="border-right:1px solid #e0ebff;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="background:#f8fafc;padding:10px 20px;border-bottom:1px solid #e8edf5;">
                        <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">Your Details</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px;">
                        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#101a56;">${data.customerName}</p>
                        <p style="margin:0 0 4px;font-size:13px;color:#475569;">Email: <a href="mailto:${data.customerEmail}" style="color:#3f63ff;text-decoration:none;">${data.customerEmail}</a></p>
                        <p style="margin:0;font-size:13px;color:#475569;">Tel: <a href="tel:${data.customerPhone}" style="color:#3f63ff;text-decoration:none;">${data.customerPhone}</a></p>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- VEHICLE DETAILS column -->
                <td width="50%" valign="top">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="background:#f8fafc;padding:10px 20px;border-bottom:1px solid #e8edf5;">
                        <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">Vehicle Details</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px;">
                        <!-- Reg plate badge -->
                        <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                          <tr>
                            <td style="background:#f5c518;border-radius:6px;padding:5px 10px;">
                              <table cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="background:#003399;border-radius:3px;padding:2px 6px;font-size:9px;font-weight:700;color:#ffffff;vertical-align:middle;">UK</td>
                                  <td style="padding-left:8px;font-size:15px;font-weight:800;color:#111111;letter-spacing:0.08em;vertical-align:middle;">${data.reg}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!-- Vehicle rows -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          ${vehicleRows}
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── ADD TO CALENDAR ── -->
        <tr>
          <td style="background:#f8fafc;border-left:1px solid #e0ebff;border-right:1px solid #e0ebff;border-bottom:1px solid #e8edf5;padding:10px 32px;">
            <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">Add to Calendar</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;border-left:1px solid #e0ebff;border-right:1px solid #e0ebff;border-bottom:1px solid #e0ebff;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
              <tr>
                <td style="padding:4px;">
                  <a href="${googleUrl}" style="${btnStyle}">Google</a>
                </td>
                <td style="padding:4px;">
                  <a href="${outlookUrl}" style="${btnStyle}">Outlook</a>
                </td>
                <td style="padding:4px;">
                  <a href="${office365Url}" style="${btnStyle}">Office 365</a>
                </td>
                <td style="padding:4px;">
                  <a href="${yahooUrl}" style="${btnStyle}">Yahoo</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="padding:24px 32px;text-align:center;">
            <p style="margin:0 0 6px;font-size:13px;color:#64748b;">${site.name} &bull; ${site.addressLines.join(", ")}</p>
            <p style="margin:0;font-size:13px;color:#64748b;">
              <a href="tel:${site.phoneTel}" style="color:#3f63ff;text-decoration:none;">${site.phoneDisplay}</a>
              &nbsp;&bull;&nbsp;
              <a href="mailto:${site.email}" style="color:#3f63ff;text-decoration:none;">${site.email}</a>
            </p>
            <p style="margin:12px 0 0;font-size:11px;color:#94a3b8;">Please save your reference number: <strong style="color:#64748b;">${data.reference}</strong></p>
          </td>
        </tr>

      </table>
      <!-- /Card -->

    </td>
  </tr>
</table>

</body>
</html>`;

  await resend.emails.send({
    from: `${site.name} <enquiries@hestonautomotive.com>`,
    to: data.customerEmail,
    subject: `Booking Confirmed – ${data.reference} | ${serviceLabel} on ${dateFormatted}`,
    html,
  });
}
