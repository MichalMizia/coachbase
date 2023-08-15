import Button from "@/components/ui/Button";
import { PlusCircleIcon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
// radix
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { HTMLProps, useState } from "react";
import { Icons } from "@/components/ui/icons";
// utils
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Label } from "@radix-ui/react-dropdown-menu";
import RatingPicker from "@/components/custom/RatingPicker";

interface AddReviewFormProps extends HTMLProps<HTMLFormElement> {
  userId: string;
  trainerName: string;
  trainerDataId: string;
}

export const trainerReviewSchema = z.object({
  description: z.string().min(12).max(400),
});

type FormData = z.infer<typeof trainerReviewSchema>;

const AddReviewForm = ({
  className,
  userId,
  trainerName,
  trainerDataId,
  ...props
}: AddReviewFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(trainerReviewSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  console.log("Rating: ", rating);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      if (rating === 0) {
        return toast.error("Opinia musi mieć ilość gwiazdek");
      }

      const res = await axios.post("/api/dodaj-opinie", {
        userId,
        rating,
        description: data.description,
        trainerDataId,
      });
      console.log(res);
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
      }
      toast.error("Coś poszło nie tak podczas dodawania opinii");
      return null;
    } finally {
      setIsLoading(false);
    }

    toast.success("Dodano opinię");
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="items-center">
            <PlusCircleIcon className="mr-1 h-4 w-4 text-gray-200" />
            Dodaj opinię
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm rounded-md">
          <form {...props} onSubmit={handleSubmit(onSubmit)} className="static">
            <DialogHeader>
              <DialogTitle className="text-gray-800">
                Dodaj opinię - {trainerName}
              </DialogTitle>
            </DialogHeader>

            <RatingPicker
              setRating={setRating}
              rating={rating}
              className="mt-4 border border-black/5 shadow-md shadow-black/30"
            />

            <Label className="sr-only">Twoja Opinia</Label>
            <div className="my-4">
              <TextareaAutosize
                id="description"
                key="description"
                defaultValue="Potęzny trener i essunia"
                className=" w-full rounded-md border border-black/20 bg-slate-50 px-3 py-2 text-gray-700 shadow-md outline-none outline-offset-0 transition-all placeholder:text-slate-500 hover:border-indigo_custom/30 focus:border-indigo_custom/40 focus:outline focus:outline-1 focus:outline-indigo_custom/30"
                placeholder="Uzasadnij swoją opinię"
                {...register("description")}
              />
              {errors?.description && (
                <p className="px-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <DialogFooter className="gap-y-2">
              <DialogTrigger asChild>
                <Button variant="outlined" className="pl-2.5  text-gray-800">
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </DialogTrigger>
              <Button variant="default" isLoading={isLoading}>
                {!isLoading && <Icons.post className="mr-2 h-4 w-4" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddReviewForm;
