"use client";

// components
import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
// hooks
import React, { HTMLProps, useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import TextareaAutosize from "react-textarea-autosize";

interface ContactFormProps extends HTMLProps<HTMLFormElement> {
  site_key: string;
}

const ProfileUpdateSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof ProfileUpdateSchema>;

export function ContactForm({
  className,
  site_key,
  ...props
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ProfileUpdateSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const captchaRef = useRef<any>(null);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    // recaptcha token
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    if (!token) {
      return toast.error("Wypełnij recaptche.");
    }

    try {
      await axios.post("/api/contact", {
        username: data.username,
        email: data.email,
        message: data.message,
        token,
      });

      toast.success(
        (t) => (
          <div className="space-y-1">
            <h4 className="text-xl font-semibold">Przesłano wiadomość</h4>
            <p>Postaramy się odpowiedzieć najszybciej jak to możliwe.</p>
          </div>
        ),
        {
          className: "custom",
          duration: 6000,
        }
      );
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.status?.toString()[0] === "4" &&
        e.response?.data?.message
      ) {
        toast.error(e.response.data.message);
        return null;
      } else if (e instanceof z.ZodError) {
        toast.error("Formularz wypełniony niepoprawnie");
        return null;
      } else if (e instanceof Error && e.message) {
        return toast.error(
          (t) => (
            <div className="space-y-1">
              <h4 className="text-xl font-semibold">
                Niestety nie udało się przesłać wiadomości
              </h4>
              {/* @ts-expect-error */}
              <p>Błąd: {e.message}</p>
            </div>
          ),
          {
            className: "custom",
            duration: 6000,
          }
        );
      }
      toast.error(
        (t) => (
          <div className="space-y-1">
            <h4 className="text-xl font-semibold">
              Niestety nie udało się przesłać wiadomości
            </h4>
            <p>
              Upewnij się że poprawnie wypełniłeś formularz i spróbuj ponownie.
            </p>
          </div>
        ),
        {
          className: "custom",
          duration: 6000,
        }
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[460px] rounded-md border border-gray-300 p-6 shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-stretch justify-center"
      >
        <div className="grid gap-y-4">
          <div className="flex w-full flex-col justify-start gap-1.5">
            <Label htmlFor="username" className="text-gray-700">
              Imię i Nazwisko
            </Label>
            <input
              type="text"
              {...register("username")}
              id="username"
              key="username"
              placeholder={`Imię i Nazwisko`}
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-1 focus:outline-indigo_custom/30 focus:ring-blue-500"
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col justify-start gap-1.5">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <input
              type="text"
              {...register("email")}
              id="email"
              key="email"
              placeholder={`Email`}
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-1 focus:outline-indigo_custom/30 focus:ring-blue-500"
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col justify-start gap-1.5">
            <Label htmlFor="email" className="text-gray-700">
              Wiadomość
            </Label>
            <TextareaAutosize
              {...register("message")}
              id="message"
              key="message"
              placeholder={`Wiadomość`}
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-1 focus:outline-indigo_custom/30 focus:ring-blue-500"
            />
            {errors?.message && (
              <p className="px-1 text-xs text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>
          <ReCAPTCHA className="mt-4" sitekey={site_key} ref={captchaRef} />
          <Button className="w-full" type="submit" isLoading={isLoading}>
            Prześlij
          </Button>
        </div>
      </form>
    </div>
  );
}
