"use client";

// components
import { Icons } from "@/components/ui/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// hooks
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditOfferForm from "./EditTestimonialForm";
import { DollarSign } from "lucide-react";
import { TrainerTestimonialType } from "@/model/trainerDataSubSchemas/trainerTestimonial";
import Image from "next/image";
import StarsRating from "@/components/custom/StarsRating";
import { cn } from "@/lib/utils";
import EditTestimonialForm from "./EditTestimonialForm";

interface TrainerTestimonialCardProps
  extends Omit<TrainerTestimonialType, "createdAt"> {
  userId: string;
}

const TrainerTestimonialCard = ({
  userId,
  description,
  title,
  _id,
  transformation,
  photoAlt,
  photoUrl,
}: TrainerTestimonialCardProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="relative max-w-xl cursor-pointer space-y-2 overflow-hidden rounded-md border shadow shadow-[#00000030] transition-all hover:shadow-lg hover:shadow-[#00000030]">
          {!!photoUrl.length && (
            <div className="relative flex aspect-video items-stretch justify-stretch overflow-hidden rounded-t-md border-2 border-white shadow-md">
              <div className="relative h-full flex-1">
                <Image
                  src={photoUrl[0]}
                  alt={
                    photoAlt[0] ||
                    `Efekt współpracy z trenerem o tytule - ${title}`
                  }
                  fill
                  className="border-r object-cover"
                />
              </div>
              {photoUrl[1] && (
                <div className="relative h-full flex-1">
                  <Image
                    src={photoUrl[1]}
                    alt={
                      photoAlt[1] ||
                      `Wynik po zakończeniu współpracy - ${title}`
                    }
                    fill
                    className="border-l object-cover"
                  />
                </div>
              )}
            </div>
          )}
          <article className={cn("p-4", !!photoUrl.length ? "pt-2" : "")}>
            <header className="flex w-full items-center justify-between gap-2">
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-body font-[500] text-gray-800">{title}</h3>
                <div className="relative -left-0.5 pr-1 text-lg leading-5 tracking-[-4px] text-transparent [text-shadow:0_0_0_#60a5fa]">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <DropdownMenu>
                <DialogTrigger asChild>
                  <DropdownMenuTrigger
                    // onClick={() => setIsModalOpen((val) => !val)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border bg-white transition-colors hover:bg-slate-50"
                  >
                    <Icons.ellipsis className="h-4 w-4" />
                    <span className="sr-only">Open</span>
                  </DropdownMenuTrigger>
                </DialogTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <button className="flex w-full">Edit</button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DialogTrigger className="w-full">
                    <DropdownMenuItem
                      className="flex w-full cursor-pointer items-center text-red-600 focus:bg-red-50"
                      onSelect={() => setShowDeleteAlert(true)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <p className="mt-2 text-text_readable">{description}</p>
          </article>
        </li>
      </DialogTrigger>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-800">
              Jesteś pewny że chcesz usunąć ten efekt współpracy?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ta akcja nie może być cofnięta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel autoFocus={false}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              autoFocus={false}
              onClick={async (event: any) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                const res = await axios.delete("/api/efekty", {
                  data: {
                    testimonialId: _id,
                    userId,
                  },
                });

                if (res.status === 200) {
                  setIsDeleteLoading(false);
                  toast.success("Pomyślnie usunięto efekt współpracy");
                  router.refresh();
                } else if (res.data.message) {
                  toast.error(res.data.message);
                } else toast.error("Błąd podczas usuwania efektu współpracy");

                setShowDeleteAlert(false);
              }}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* dialog for editing the testimonial */}
      <EditTestimonialForm
        userId={userId}
        testimonialId={JSON.stringify(_id)}
        defaultTitle={title}
        defaultDescription={description}
        defaultPhotoAlts={[]}
        defaultPhotoUrls={photoUrl}
        defaultTransformation={transformation}
      />
    </Dialog>
  );
};

export default TrainerTestimonialCard;
