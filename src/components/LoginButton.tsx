"use client";

import { LogIn, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Button from "./ui/Button";
import { toast } from "react-hot-toast";
import { classNames } from "@/lib/utils";

interface LoginButtonProps {
  session?: Session | null;
  className?: string;
}

export default function LoginButton({ session, className }: LoginButtonProps) {
  function handleSignOut() {
    try {
      signOut();
      toast.success("Wylogowano");
    } catch (e) {
      toast.error("Wylogowywanie nie powiodło się");
    }
  }

  if (session) {
    return (
      <Button
        className={classNames(
          className!,
          "relative top-[1px] flex items-center justify-center gap-1 rounded-xl px-4"
        )}
        onClick={() => handleSignOut()}
      >
        Wyloguj
        <LogOut size={20} />
      </Button>
    );
  } else {
    return (
      <Button
        className={classNames(className!, "relative top-[1px] rounded-xl px-4")}
      >
        <a href="/login" className="flex items-center justify-center gap-1">
          Zaloguj
          <LogIn size={20} className="relative top-[1px] text-white" />
        </a>
      </Button>
    );
  }
}
