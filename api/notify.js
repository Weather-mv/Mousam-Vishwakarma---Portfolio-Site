import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow POST requests only
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get credentials from environment variables
  const emailUser = process.env.EMAIL_USER || 'mousam07999@gmail.com';
  const emailPass = process.env.EMAIL_PASS;

  if (!emailPass) {
    console.warn('[Access Notification] Serverless function triggered, but EMAIL_PASS environment variable is not configured.');
    return res.status(500).json({ 
      error: 'Mail server credentials are not configured.',
      message: 'Please set the EMAIL_PASS environment variable in Vercel settings.'
    });
  }

  // Extract client details from headers (populated by Vercel)
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'Unknown IP';
  
  // Geolocation details from Vercel edge headers
  const city = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : 'Unknown City';
  const region = req.headers['x-vercel-ip-country-region'] || '';
  const country = req.headers['x-vercel-ip-country'] || 'Unknown Country';
  const userAgent = req.headers['user-agent'] || 'Unknown Device/Browser';

  const location = region ? `${city}, ${region}, ${country}` : `${city}, ${country}`;
  
  // Format current date & time in Indian Standard Time (IST)
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium'
  }) + ' (IST)';

  try {
    // Configure standard Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    // Structure the HTML email template with matching premium dark mode styling
    const mailOptions = {
      from: `"Portfolio Access Monitor" <${emailUser}>`,
      to: 'mousam07999@gmail.com',
      subject: `🚀 Portfolio Accessed! (${city}, ${country})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f3f4f6; padding: 30px; border-radius: 12px; max-width: 600px; margin: 20px auto; border: 1px solid #1f2937; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
          <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #1f2937; padding-bottom: 20px;">
            <span style="font-size: 45px; display: inline-block; margin-bottom: 10px;">🚀</span>
            <h1 style="color: #818cf8; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">Portfolio Access Alert</h1>
            <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 14px;">A visitor has accessed your website</p>
          </div>
          
          <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #38bdf8; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #374151; padding-bottom: 8px; font-size: 16px; font-weight: 600;">Visitor Info</h3>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="padding: 10px 0; color: #9ca3af; font-weight: 500; width: 30%;">IP Address</td>
                <td style="padding: 10px 0; color: #f3f4f6; font-family: 'Geist Mono', monospace; font-size: 13px;">${ip}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="padding: 10px 0; color: #9ca3af; font-weight: 500;">Location</td>
                <td style="padding: 10px 0; color: #38bdf8; font-weight: 600;">${location}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="padding: 10px 0; color: #9ca3af; font-weight: 500;">Time (IST)</td>
                <td style="padding: 10px 0; color: #f3f4f6;">${timestamp}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af; font-weight: 500; vertical-align: top;">Device Info</td>
                <td style="padding: 10px 0; color: #9ca3af; font-size: 12px; line-height: 1.5; word-break: break-all;">${userAgent}</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 11px; margin-top: 25px; border-top: 1px solid #1f2937; padding-top: 15px;">
            This notification was generated automatically by your live Portfolio Website.
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Notification email sent successfully.' });

  } catch (error) {
    console.error('[Access Notification] Error sending notification email:', error);
    return res.status(500).json({ 
      error: 'Failed to send notification email.', 
      details: error.message 
    });
  }
}
