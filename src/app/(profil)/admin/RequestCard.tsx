"use client";

import { UserRolesType } from "@/model/user";
import axios, { AxiosError } from "axios";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import slugify from "slugify";

interface RequestCardProps {
  name: string;
  description: string | undefined;
  email: string;
  link: string;
  roles: UserRolesType[];
  city: string;
}

const RequestCard = ({
  name,
  description,
  email,
  link,
  roles,
  city,
}: RequestCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const slug = slugify(name.toLocaleLowerCase(), { strict: true, lower: true });

  async function handleAccept(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    console.log("accepting");

    try {
      await axios.post("/admin/accept", {
        email: email,
        summary: description,
        roles: roles,
        city: city,
        slug: slug,
      });
      return toast.success("Zaakceptowano trenera");
    } catch (e) {
      toast.error("Coś poszło nie tak podczas akceptacji");
      return null;
    } finally {
      setIsLoading(false);
    }
  }
  async function handleReject(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    console.log("rejecting");

    try {
      await axios.post("/admin/reject", {
        email: email,
      });
      return toast.success("Odrzucono trenera");
    } catch (e) {
      toast.error("Coś poszło nie tak podczas odrzucania");
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <li className="min-h-40 relative flex w-full flex-col items-start justify-between rounded-sm border border-text bg-white p-4 shadow shadow-[#00000030]">
      {isLoading ? (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-[#ffffff30]">
          <Loader2 className="animate-spin" size={60} />
        </div>
      ) : null}
      <div className="">
        <header className="mb-2 flex w-fit items-center justify-center gap-3 text-black">
          <p className="text-lg capitalize">{name}</p>
          <marker className="h-1 w-1 rounded-full bg-black" />
          <p className="text-lg">{email}</p>
        </header>
        <p className="mb-1 text-sm">
          <span className="text-md font-bold tracking-wide text-gray-800">
            Opis:{" "}
          </span>
          {description}
        </p>
        <p className="mb-1 text-sm">
          <span className="text-md font-bold tracking-wide text-gray-800">
            Link weryfikacyjny:{" "}
          </span>
          <a
            target="_blank"
            className="underline underline-offset-2"
            href={link}
          >
            {link}
          </a>
        </p>
        <p className="mb-1 text-sm">
          <span className="text-md font-bold tracking-wide text-gray-800">
            Role:{" "}
          </span>
          {JSON.stringify(roles)}
        </p>
      </div>
      <div className="buttons mt-2 flex items-center justify-center gap-3">
        <form onSubmit={(e: FormEvent) => handleAccept(e)}>
          <button
            type="submit"
            className="rounded-full bg-green-500 p-[7px] text-white shadow-sm transition-colors hover:bg-green-600"
          >
            <CheckIcon size={17} />
          </button>
        </form>
        <form onSubmit={(e: FormEvent) => handleReject(e)}>
          <button className="rounded-full bg-red-500 p-[7px] text-white shadow-sm transition-colors hover:bg-red-600">
            <XIcon size={17} />
          </button>
        </form>
      </div>
    </li>
  );
};

export default RequestCard;
