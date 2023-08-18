import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { Body, Head, Html, Tailwind, Text } from "@react-email/components";
import { render } from "@react-email/render";

interface EmailProps {
  email: string;
  username: string;
  message: string;
}

const Email = ({ email, username, message }: EmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Head />

        <Body>
          <Text className="arial mb-4 text-base text-black dark:text-white">
            Nazwa Użytkownika: {username}
          </Text>
          <Text className="arial mb-4 text-base text-black dark:text-white">
            Email: {email}
          </Text>
          <Text className="arial mb-4 text-base text-black dark:text-white">
            Wiadomość: {message}
          </Text>
        </Body>
      </Html>
    </Tailwind>
  );
};

export async function sendContactEmail({
  email,
  username,
  message,
}: EmailProps) {
  const sendFrom = process.env.NODEMAILER_EMAIL;
  const password = process.env.NODEMAILER_PW;

  if (!sendFrom || !password) {
    throw new Error("Please defined Nodemailer ENV variables");
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: sendFrom,
      pass: password,
    },
  });

  const emailHtml = render(
    Email({ username: username, email: email, message: message })
  );

  var mailOptions: Mail.Options = {
    from: sendFrom,
    to: "coachbase7@gmail.com",
    subject: `${username} - Wypełniono formularz kontaktowy na CoachBase`,
    html: emailHtml,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
