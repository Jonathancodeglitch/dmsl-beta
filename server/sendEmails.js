import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  host: "send.one.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.email,
    pass: process.env.email_password,
  },
});

async function sendContactUsFormMessage(emailBody) {
  try {
    const info = await transporter.sendMail({
      from: '"Dmsl" jonathanohwevwo@brinicon.com ', // sender address
      to: "jonathankendrick697@gmail.com", // list of receivers
      subject: emailBody.subject, // Subject line
      html: `  <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); font-size:20px;">
              <img src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1728264772/Logo-dark_zi7avz_tarasa.png" alt="dmsl logo" style="width: 150px;"/>
              <h3 style="color: #333;">Message from contact form</h3>  
              <p style="color: #666;">Message: ${emailBody.message} <br/> Sender email: ${emailBody.email}</p>
              <div style="text-align: center; font-size: 14px; color: #888; margin-top: 20px;">
                  &copy; 2024 Dmsl. All rights reserved.
              </div>
          </div>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("message not sent, error");
  }
}

export { sendContactUsFormMessage };
