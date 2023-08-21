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
import { TrainerOfferType } from "@/model/trainerDataSubSchemas/trainerOffer";
import EditOfferForm from "./EditOfferForm";
import { DollarSign } from "lucide-react";

interface TrainerOfferCardProps extends TrainerOfferType {
  userId: string;
}

const TrainerOfferCard = ({
  userId,
  description,
  title,
  _id,
  price,
  pricePer,
}: TrainerOfferCardProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="max-w-xl cursor-pointer space-y-2 rounded-md border p-4 shadow shadow-[#00000030] transition-all hover:shadow-lg hover:shadow-[#00000030]">
          <article className="flex items-center justify-between">
            <main className="grid gap-1">
              <header className="flex items-center justify-start gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-indigo_custom/10 bg-bg p-4 shadow-md">
                  <DollarSign className="h-full w-full" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-body font-[500] text-gray-800 underline decoration-transparent underline-offset-[3px] transition-all duration-300 group-hover:decoration-current">
                    {title}
                  </h3>
                  <p className="text-sm">
                    {price}/{pricePer}
                  </p>
                </div>
              </header>
            </main>
            <DropdownMenu>
              <DialogTrigger asChild>
                <DropdownMenuTrigger
                  // onClick={() => setIsModalOpen((val) => !val)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50"
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
          <p className="px-1.5 text-text_readable">{description}</p>
        </li>
      </DialogTrigger>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-800">
              Jesteś pewny że chcesz usunąć tą ofertę?
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

                const res = await axios.delete("/api/oferty", {
                  data: {
                    offerId: _id,
                    userId,
                  },
                });

                if (res.status === 200) {
                  setIsDeleteLoading(false);
                  router.refresh();
                  toast.success("Pomyślnie usunięto ofertę");
                } else if (res.data.message) {
                  toast.error(res.data.message);
                } else toast.error("Błąd podczas usuwania oferty");

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

      {/* dialog for editing the offer */}
      <EditOfferForm
        userId={userId}
        offerId={JSON.stringify(_id)}
        defaultTitle={title}
        defaultDescription={description}
        defaultPrice={price}
        defaultPricePer={pricePer}
      />
    </Dialog>
  );
};

export default TrainerOfferCard;
