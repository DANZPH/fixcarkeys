import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, postcode, carMake, service, message } = body;

        // Basic validation
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Name, email, and phone are required' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: process.env.MAIL_ENCRYPTION === 'ssl', // true for 465, false for other ports. Mailjet often uses 587 (TLS) which is secure: false
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to: 'fixcarkeys@yahoo.com',
            replyTo: email,
            subject: `New Quote Request: ${carMake || 'Car Key Service'} - ${name}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Postcode/Area: ${postcode || 'N/A'}
Car Make: ${carMake || 'N/A'}
Service Required: ${service || 'N/A'}

Message:
${message || 'N/A'}
            `,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Quote Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #778873 0%, #5d6b5a 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">FixCarKeys</h1>
                            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">New Quote Request</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                
                                <!-- Introduction -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="margin: 0; color: #555555; font-size: 16px; line-height: 1.6;">
                                            You have received a new inquiry from the website contact form. Here are the details:
                                        </p>
                                    </td>
                                </tr>

                                <!-- Details Box -->
                                <tr>
                                    <td style="background-color: #f8f9fa; border-radius: 8px; padding: 25px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 12px; width: 40%; vertical-align: top;">
                                                    <strong style="color: #778873; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Customer Name</strong>
                                                </td>
                                                <td style="padding-bottom: 12px; color: #333333; font-weight: 600;">
                                                    ${name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 12px; width: 40%; vertical-align: top;">
                                                    <strong style="color: #778873; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</strong>
                                                </td>
                                                <td style="padding-bottom: 12px; color: #333333; font-weight: 600;">
                                                    <a href="tel:${phone}" style="color: #333333; text-decoration: none;">${phone}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 12px; width: 40%; vertical-align: top;">
                                                    <strong style="color: #778873; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</strong>
                                                </td>
                                                <td style="padding-bottom: 12px; color: #333333; font-weight: 600;">
                                                    <a href="mailto:${email}" style="color: #333333; text-decoration: none;">${email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 12px; width: 40%; vertical-align: top;">
                                                    <strong style="color: #778873; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Location</strong>
                                                </td>
                                                <td style="padding-bottom: 12px; color: #333333; font-weight: 600;">
                                                    ${postcode || 'Not Provided'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 12px; width: 40%; vertical-align: top;">
                                                    <strong style="color: #778873; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Vehicle</strong>
                                                </td>
                                                <td style="padding-bottom: 12px; color: #333333; font-weight: 600;">
                                                    ${carMake || 'Not Specified'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 40%; vertical-align: top;">
                                                    <strong style="color: #778873; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Service Needed</strong>
                                                </td>
                                                <td style="color: #333333; font-weight: 600;">
                                                    ${service || 'General Inquiry'}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Message Section -->
                                <tr>
                                    <td style="padding-top: 30px;">
                                        <strong style="color: #333333; display: block; margin-bottom: 10px; font-size: 18px;">Message:</strong>
                                        <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; color: #555555; line-height: 1.6; white-space: pre-wrap;">${message || 'No additional message provided.'}</div>
                                    </td>
                                </tr>

                                <!-- Action Button -->
                                <tr>
                                    <td align="center" style="padding-top: 35px;">
                                        <a href="mailto:${email}?subject=Re: Your Quote Request to FixCarKeys" style="background-color: #778873; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; display: inline-block;">Reply to Customer</a>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                Sent automatically from the FixCarKeys website contact form.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
