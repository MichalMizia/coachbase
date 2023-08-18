"use client";

import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { classNames } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

const buttonVariants = cva(
  "active:scale-95 rounded-lg items-center justify-center text-sm font-medium transition-all duration-300 inline-flex focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-75 disabled:brightness-90 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-slate-950 text-white hover:bg-slate-800",
        text: "hover:bg-slate-200",
        primary:
          "bg-secondary_custom text-white hover-circle-overlay border-secondary_custom border-2 relative overflow-hidden",
        primary_outlined:
          "bg-slate-100 border-2 text-black border-solid border-secondary_custom hover:bg-slate-200 transition-colors",
        outlined:
          "bg-slate-100 border-2 border-solid border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-colors",
      },
      size: {
        default: "py-2 px-4",
        large: "py-3 px-6",
        small: "py-1 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export default function PrevRouteBtn({
  className,
  variant,
  size,
  isLoading,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={classNames(buttonVariants({ variant, size }), className!)}
      disabled={isLoading}
      {...props}
      onClick={() => router.back()}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
