import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: env.googleUser,
    clientSecret: env.googleClientSecret,
    clientId: env.googleClientId,
    refreshToken: env.googleRefreshToken,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Mail transporter is ready");
  })
  .catch((err) => {
    console.error("Error setting up mail transporter:", err);
  });

export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: env.googleUser,
    to,
    subject,
    html,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
};
