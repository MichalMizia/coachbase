import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
  components: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const whitelisted_emails = process.env.WHITELISTED_EMAILS?.split(
    ", "
  ) as string[];
  if (
    !session ||
    !session.user.email ||
    !whitelisted_emails.includes(session.user.email)
  ) {
    return notFound();
  }

  // when the user is logged in as a trainer
  return <>{children}</>;
}
