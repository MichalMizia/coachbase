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
import ImagePlaceholder from "@/../public/assets/image-placeholder.jpg";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import EditNewsForm from "./EditNewsForm";
import { sanitize } from "isomorphic-dompurify";

interface TrainerNewsCardProps {
  title: string;
  date: Date;
  id: string;
  photoUrl: string | null;
  userId: string;
  content: string;
}

const TrainerNewsCard = ({
  title,
  date,
  id,
  photoUrl,
  userId,
  content,
}: TrainerNewsCardProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <main className="relative w-full max-w-lg rounded-md border bg-white p-4 shadow shadow-[#00000030] transition-all hover:shadow-lg hover:shadow-[#00000030]">
          <header className="flex w-full items-center justify-between">
            <div className="">
              <h3 className="text-h5 font-[500] leading-8 text-gray-800 underline decoration-transparent underline-offset-[3px] transition-all duration-300 group-hover:decoration-current">
                {title}
              </h3>
              <p>{formatDate(date)}</p>
            </div>
            <DropdownMenu>
              <DialogTrigger>
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
                  <DialogTrigger>
                    <p
                      title="Edytuj wpis do aktualności"
                      className="flex w-full"
                    >
                      Edit
                    </p>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
                  onSelect={() => setShowDeleteAlert(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog
              open={showDeleteAlert}
              onOpenChange={setShowDeleteAlert}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-800">
                    Jesteś pewny że chcesz usunąć ten post?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Ta akcja nie może być cofnięta.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel autoFocus={false}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    autoFocus={false}
                    onClick={async (event: any) => {
                      event.preventDefault();
                      setIsDeleteLoading(true);

                      const res = await axios.delete("/api/artykuly", {
                        data: {
                          id,
                          userId,
                        },
                      });

                      if (res.status === 200) {
                        setIsDeleteLoading(false);
                        router.refresh();
                        toast.success("Pomyślnie usunięto artykuł");
                      } else if (res.data.message) {
                        toast.error(res.data.message);
                      } else toast.error("Błąd podczas usuwania artykułu");

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
          </header>

          <div className="relative isolate mx-auto my-2 aspect-video w-full">
            <Image
              alt={`Miniatura aktualności o tytule - ${title}`}
              src={photoUrl || ImagePlaceholder}
              fill
              priority
              className="aspect-video rounded-sm object-cover shadow-md"
            />
          </div>
          <div
            className="xsmall-article flow mt-2 text-gray-800"
            dangerouslySetInnerHTML={{ __html: sanitize(content) }}
          ></div>
        </main>
      </DialogTrigger>
      <EditNewsForm
        defaultDescription={content}
        defaultTitle={title}
        userId={userId}
        newsId={id}
        defaultPhotoUrl={photoUrl}
      />
    </Dialog>
  );
};

export default TrainerNewsCard;

// async function deletePost(postId: string) {
//   const response = await fetch(`/api/posts/${postId}`, {
//     method: "DELETE",
//   });

//   if (!response?.ok) {
//     toast({
//       title: "Something went wrong.",
//       description: "Your post was not deleted. Please try again.",
//       variant: "destructive",
//     });
//   }

//   return true;
// }
