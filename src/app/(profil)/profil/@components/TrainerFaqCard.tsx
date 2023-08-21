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
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TrainerFAQQuestionType } from "@/model/trainerDataSubSchemas/trainerFaq";

interface TrainerFAQCardProps
  extends Omit<TrainerFAQQuestionType, "createdAt"> {
  userId: string;
}

const TrainerFAQCard = ({ userId, question, answer }: TrainerFAQCardProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="relative max-w-xl cursor-pointer space-y-2 overflow-hidden rounded-md border shadow shadow-[#00000030] transition-all hover:shadow-lg hover:shadow-[#00000030]">
          <article className={cn("p-4")}>
            <div className="flex flex-col items-start justify-center">
              <h3 className="text-body font-[500] text-gray-800">{question}</h3>
            </div>
            <p className="mt-2 text-text_readable">{answer}</p>

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

                const res = await axios.delete("/api/doswiadczenie/efekty", {
                  data: {
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
      {/* <EditTestimonialForm
        userId={userId}
        testimonialId={JSON.stringify(_id)}
        defaultTitle={title}
        defaultDescription={description}
        defaultPhotoAlts={[]}
        defaultPhotoUrls={photoUrl}
        defaultTransformation={transformation}
      /> */}
    </Dialog>
  );
};

export default TrainerFAQCard;
