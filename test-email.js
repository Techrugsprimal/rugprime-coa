require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTestEmail() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: '"Rug Prime" <' + process.env.EMAIL_USER + '>',
        to: process.env.EMAIL_USER, // Sending a test email to yourself
        subject: "Test Email from Rug Prime Server",
        text: "This is a test email to check if email sending works."
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Test email sent: " + info.response);
    } catch (error) {
        console.error("❌ Email send failed:", error);
    }
}

sendTestEmail();
