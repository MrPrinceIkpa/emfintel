import { createTransport } from 'nodemailer';

export async function sendEmail(toEmail, pdfBase64) {
  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "EMF Intel",
      to: toEmail,
      subject: `Your EMF Intel Report`,
      text: 'Thank you for using EMF Intel. Your report is attached.',
      attachments: [
        {
          filename: `emf-report-${toEmail}.pdf`,
          content: pdfBase64,
          encoding: 'base64',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
