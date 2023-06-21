import authOptions from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import RequestCard from "./RequestCard";
import { PendingRequestType } from "@/model/pendindRequest";
import { fetchAllPendingRequests } from "@/lib/fetching/fetchPendingRequests";

export const metadata: Metadata = {
  title: "Admin Page",
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

interface pageProps {}

const Page = async ({}: pageProps) => {
  const session = await getServerSession(authOptions);
  const pendingRequests: PendingRequestType[] = await fetchAllPendingRequests();

  if (!session || session.user.email !== "mmizia05@gmail.com") {
    return notFound();
  }
  return (
    <main className="py-8">
      <div className="container-md">
        <h1 className="mb-4 text-3xl font-semibold text-black">Admin</h1>
        <ul className="requests grid grid-flow-row grid-cols-1 gap-x-2 gap-y-4 py-2 md:grid-cols-2 xl:grid-cols-3">
          {pendingRequests.map((request) => (
            <RequestCard
              key={request.email}
              roles={request.roles}
              description={request.summary}
              name={request.username}
              email={request.email}
              link={request.link}
              city={request.city}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Page;
