import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import {
  Body,
  Head,
  Html,
  Link,
  Tailwind,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";

interface EmailProps {
  username: string;
}

const Email = ({ username }: EmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Head />

        <Body>
          <Text className="arial mb-4 text-base text-black dark:text-white">
            Cześć {username}, Twoje konto trenerskie właśnie zostało
            zaakceptowane na witrynie CoachBase, możesz teraz przejść do swojego
            profilu w zakładce{" "}
            <Link href="https://www.coachbase.pl/profil">
              coachbase.pl/profil
            </Link>{" "}
            i zacząć edytować profil biznesowy.
          </Text>
        </Body>
      </Html>
    </Tailwind>
  );
};

interface FuncProps {
  email: string;
  username: string;
}

export async function sendAcceptEmail({ email, username }: FuncProps) {
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

  const emailHtml = render(Email({ username: username }));

  var mailOptions: Mail.Options = {
    from: sendFrom,
    to: email,
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
