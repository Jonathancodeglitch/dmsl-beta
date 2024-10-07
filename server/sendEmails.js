import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "send.one.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.email_password,
  },
});

async function sendContactUsFormMessage(emailBody) {
  try {
    const info = await transporter.sendMail({
      from: `"Dmsl" "${process.env.email}"`,
      to: "jonathankendrick697@gmail.com",
      subject: "Message from contact form",
      html: `  <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); font-size:20px;">
              <img src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1728264772/Logo-dark_zi7avz_tarasa.png" alt="dmsl logo" style="width: 150px;"/>
              
              <p style="color: #666;">Subject:<strong> ${emailBody.subject}</strong><br/> Message: ${emailBody.message} <br/> Sender email: ${emailBody.email}</p>
              <div style="text-align: center; font-size: 14px; color: #888; margin-top: 20px;">
                  &copy; 2024 Dmsl. All rights reserved.
              </div>
          </div>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("message not sent", error);
  }
}

export { sendContactUsFormMessage };
