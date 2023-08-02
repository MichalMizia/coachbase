import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import {
  Body,
  Button,
  Head,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";

const Email = ({ url }: { url: string }) => {
  return (
    <Tailwind>
      <Html>
        <Head />

        <Body>
          <Text className="arial mb-4 text-base text-black dark:text-white">
            Zresetuj swoje hasło kilkając w poniższy link
          </Text>
          <Button
            pX={20}
            pY={12}
            className="rounded bg-[#000000] text-center text-[12px] font-semibold text-white no-underline"
            href={url}
          >
            Reset Hasła
          </Button>
        </Body>
      </Html>
    </Tailwind>
  );
};

export async function sendResetPasswordEmail(sendTo: string, url: string) {
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

  const emailHtml = render(Email({ url: url }));

  var mailOptions: Mail.Options = {
    from: sendFrom,
    to: sendTo,
    subject: "Resetowanie Hasła",
    // html: `<a href="${url}">Kliknij tutaj żeby zmienić hasło</a>`,
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
