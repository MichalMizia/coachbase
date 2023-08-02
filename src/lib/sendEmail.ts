import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function sendMail(
  subject: string,
  sendTo: string,
  outputText: string
) {
  const sendFrom = process.env.NODEMAILER_EMAIL;
  const password = process.env.NODEMAILER_PW;

  if (!sendFrom || !password) {
    throw new Error("Please defined Nodemailer ENV variables");
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sendFrom,
      pass: password,
    },
  });

  var mailOptions: Mail.Options = {
    from: sendFrom,
    to: sendTo,
    subject: subject,
    text: outputText,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
