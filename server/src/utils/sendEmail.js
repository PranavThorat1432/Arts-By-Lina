import transporter from "../config/email.js";

// Helper to wrap raw HTML content into a premium branded email frame
const wrapHtmlTemplate = (title, bodyHtml) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FAF7F2; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #2A160E;">
      <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF7F2; padding: 40px 15px; min-width: 100%;">
        <tr>
          <td align="center">
            <!-- Center Card -->
            <table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #E6DEC9; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(31, 17, 11, 0.04); border-collapse: collapse; max-width: 600px; width: 100%;">
              <!-- Brand Header -->
              <tr>
                <td style="background-color: #1F110B; padding: 30px 20px; text-align: center; border-bottom: 3px solid #C2A26F;">
                  <h1 style="color: #C2A26F; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: bold; letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                    Arts by Lina
                  </h1>
                  <p style="color: #FEFAF0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin: 5px 0 0 0; opacity: 0.85; font-family: sans-serif;">
                    Mehndi Artist Portfolio & Bookings
                  </p>
                </td>
              </tr>
              <!-- Email Body -->
              <tr>
                <td style="padding: 45px 35px; background-color: #ffffff;">
                  ${bodyHtml}
                </td>
              </tr>
              <!-- Brand Footer -->
              <tr>
                <td style="background-color: #FAF7F2; padding: 30px 20px; text-align: center; font-size: 12px; color: #8C7B72; border-top: 1px solid #E6DEC9; font-family: sans-serif;">
                  <p style="margin: 0 0 8px 0; font-weight: bold; color: #1F110B;">Arts by Lina Admin Portal</p>
                  <p style="margin: 0 0 15px 0; font-size: 11px; line-height: 1.4;">Serving Jalgaon City and Nearby Areas<br>Timeless artistry, crafted by hand.</p>
                  <div style="margin: 15px 0 0 0; font-size: 10px; color: #B3A49C;">
                    This is an automated notification from your portfolio application.<br>
                    &copy; ${new Date().getFullYear()} Arts by Lina. All rights reserved.
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Generic email sender (with automatic branding fallback)
const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Arts by Lina" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

// 1. Sends new booking request notification to Admin
export const sendBookingNotification = async (booking) => {
  const formattedDate = new Date(booking.eventDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const htmlContent = `
    <h2 style="color: #1F110B; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; margin-top: 0; margin-bottom: 10px;">
      New Booking Appointment Request
    </h2>
    <p style="font-size: 14px; line-height: 1.6; color: #5C4D46; margin-top: 0; margin-bottom: 25px;">
      Hello Lina, you have received a new appointment request on your portfolio site. Here are the submission details:
    </p>
    
    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 25px; border: 1px solid #E6DEC9; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; width: 35%; font-family: sans-serif;">Full Name</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif;">${booking.fullName}</td>
      </tr>
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif;">Phone Number</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif; font-weight: bold;">${booking.mobileNumber}</td>
      </tr>
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif;">Email Address</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif;"><a href="mailto:${booking.email}" style="color: #C2A26F; text-decoration: none;">${booking.email}</a></td>
      </tr>
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif;">Event Type</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif;">
          <span style="background-color: #FAF7F2; border: 1px solid #E6DEC9; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; color: #C2A26F; text-transform: uppercase; letter-spacing: 0.5px;">${booking.eventType}</span>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif;">Event Date</td>
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #E21C5A; font-family: sans-serif;">${formattedDate}</td>
      </tr>
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif;">Venue Location</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif; line-height: 1.4;">${booking.location}</td>
      </tr>
      <tr>
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif;">Additional Info</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif; line-height: 1.4; white-space: pre-line;">${booking.additionalMessage || "No notes provided."}</td>
      </tr>
    </table>

    <div style="text-align: center; margin-top: 30px;">
      <a href="${process.env.CLIENT_URL}/admin/bookings" style="background-color: #1F110B; color: #C2A26F; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #C2A26F; display: inline-block; font-family: sans-serif;">
        Manage Bookings
      </a>
    </div>
  `;

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Booking Request - ${booking.fullName}`,
    html: wrapHtmlTemplate(`Booking Request: ${booking.fullName}`, htmlContent),
  });
};

// 2. Sends new contact form message notification to Admin
export const sendContactNotification = async (contact) => {
  const htmlContent = `
    <h2 style="color: #1F110B; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; margin-top: 0; margin-bottom: 10px;">
      New Contact Form Inquiry
    </h2>
    <p style="font-size: 14px; line-height: 1.6; color: #5C4D46; margin-top: 0; margin-bottom: 25px;">
      Hello Lina, a visitor has left a message on your contact form:
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 25px; border: 1px solid #E6DEC9; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; width: 30%; font-family: sans-serif;">Name</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif;">${contact.name}</td>
      </tr>
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif;">Phone Number</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif;">${contact.phone || "Not provided"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #F3EDE0;">
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif;">Email Address</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif;"><a href="mailto:${contact.email}" style="color: #C2A26F; text-decoration: none;">${contact.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 14px 18px; font-size: 13px; font-weight: bold; color: #1F110B; background-color: #FAF7F2; font-family: sans-serif; vertical-align: top;">Message</td>
        <td style="padding: 14px 18px; font-size: 13px; color: #2A160E; font-family: sans-serif; line-height: 1.5; white-space: pre-line;">${contact.message}</td>
      </tr>
    </table>

    <div style="text-align: center; margin-top: 30px;">
      <a href="${process.env.CLIENT_URL}/admin/contacts" style="background-color: #1F110B; color: #C2A26F; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #C2A26F; display: inline-block; font-family: sans-serif;">
        View All Inquiries
      </a>
    </div>
  `;

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Inquiry from ${contact.name}`,
    html: wrapHtmlTemplate(`Inquiry from: ${contact.name}`, htmlContent),
  });
};

// 3. Sends password reset instructions to Admin
export const sendPasswordResetEmail = async (email, resetURL) => {
  const htmlContent = `
    <h2 style="color: #1F110B; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; margin-top: 0; margin-bottom: 10px;">
      Admin Password Reset Request
    </h2>
    <p style="font-size: 14px; line-height: 1.6; color: #5C4D46; margin-top: 0; margin-bottom: 20px;">
      You are receiving this email because a password reset request was initiated for your Arts by Lina admin account.
    </p>
    <p style="font-size: 14px; line-height: 1.6; color: #5C4D46; margin-top: 0; margin-bottom: 25px;">
      Please click the button below to choose a new password. This reset link is only valid for **10 minutes**:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetURL}" style="background-color: #E21C5A; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 30px; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; border: none; display: inline-block; box-shadow: 0 4px 10px rgba(226, 28, 90, 0.25); font-family: sans-serif;">
        Reset Password
      </a>
    </div>

    <p style="font-size: 12px; line-height: 1.5; color: #8C7B72; margin-top: 30px; margin-bottom: 5px; border-top: 1px solid #F3EDE0; padding-top: 15px; font-family: sans-serif;">
      If you did not request a password reset, no action is required and you can safely ignore this email.
    </p>
    <p style="font-size: 11px; line-height: 1.4; color: #B3A49C; word-break: break-all; font-family: sans-serif;">
      If the button doesn't work, copy and paste this URL into your browser:<br>
      <a href="${resetURL}" style="color: #C2A26F; text-decoration: underline;">${resetURL}</a>
    </p>
  `;

  await sendEmail({
    to: email,
    subject: "Password Reset - Arts by Lina Admin",
    html: wrapHtmlTemplate("Password Reset Request", htmlContent),
  });
};

export default sendEmail;
