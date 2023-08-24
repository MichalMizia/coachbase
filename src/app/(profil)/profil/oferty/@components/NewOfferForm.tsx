"use client";

// radix
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// components
import { PlusCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { offerOptions } from "@/config/global";
import { Label } from "@radix-ui/react-label";
import TextareaAutosize from "react-textarea-autosize";
// utils
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadingStore } from "@/lib/state/loading-generation";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

interface NewOfferFormProps {
  userId: string;
}

const NewOfferSchema = z.object({
  name: z.string({
    required_error: "Nazwa oferty jest wymagana",
  }),
  description: z
    .string({
      required_error: "Opis oferty jest wymagany",
    })
    .min(20, { message: "Opis musi zawierać minimum 20 znaków" }),
  price: z.number({
    required_error: "Cena oferty jest wymagana",
    invalid_type_error: "Cena oferty musi być liczbą",
  }),
  pricePer: z.string(),
});

type FormData = z.infer<typeof NewOfferSchema>;

const NewOfferForm = ({ userId }: NewOfferFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(NewOfferSchema),
  });
  const { isLoading, setIsLoading } = useLoadingStore();
  const [customOfferTitle, setCustomOfferTitle] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setIsLoading(true);

    try {
      const res = await axios.post("/api/oferty", {
        userId,
        title: data.name,
        description: data.description,
        price: data.price,
        pricePer: data.pricePer,
      });

      toast.success("Dodano ofertę");
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
      toast.error("Coś poszło nie tak podczas dodawania oferty");
      return null;
    } finally {
      setIsLoading(false);
    }

    router.refresh();
  };

  const errors = form.formState.errors;
  const register = form.register;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nowa Oferta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-gray-800">Nowa Oferta</DialogTitle>
              <DialogDescription className="text-text_readable">
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
                {errors.price && (
                  <p className="text-sm text-red-600">{errors.price.message}</p>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-x-2 gap-y-1">
                <Label
                  htmlFor="select"
                  className="col-span-4 flex items-center justify-between gap-1 text-gray-800"
                >
                  Rodzaj oferty
                  <div className="flex items-center justify-end gap-2">
                    Wpisz własny
                    <Switch
                      id="custom-offer-title"
                      title={
                        customOfferTitle
                          ? "Wybierz tytuł z listy"
                          : "Ustaw własny tytuł oferty"
                      }
                      name={
                        customOfferTitle
                          ? "Wybierz tytuł z listy"
                          : "Ustaw własny tytuł oferty"
                      }
                      checked={customOfferTitle}
                      onCheckedChange={(e) => setCustomOfferTitle(e)}
                    />
                  </div>
                </Label>

                {customOfferTitle ? (
                  <input
                    type="text"
                    placeholder="Wpisz tytuł oferty"
                    className="col-span-4 flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("name")}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="name"
                    defaultValue="Trening Personalny"
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Wybierz ofertę" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {offerOptions.map((name) => (
                              <SelectItem key={name} value={name}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="grid grid-flow-row grid-cols-4 items-center gap-1 gap-x-2">
                <Label
                  htmlFor="description"
                  className="col-span-2 row-start-1 text-gray-800"
                >
                  Cena oferty
                </Label>
                <div className="col-span-2 row-start-2 flex h-10 w-full overflow-hidden rounded-md border border-gray-300  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <input
                    id="price"
                    key="price"
                    className="h-full w-full flex-1 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-slate-500"
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                  />
                  <span className="flex h-[80%] w-fit items-center self-center border-l-2 px-[10px] py-1 text-sm text-text_readable">
                    zł
                  </span>
                </div>
                <Label
                  htmlFor="description"
                  className="row- col-span-2 text-gray-800"
                >
                  Cena za
                </Label>
                <input
                  id="pricePer"
                  key="pricePer"
                  className="col-span-2 flex h-10 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="string"
                  {...register("pricePer")}
                  placeholder="Cena odnosi się do:"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-1">
              <Label htmlFor="description" className="col-span-2 text-gray-800">
                Opis oferty
              </Label>
              <TextareaAutosize
                id="description"
                key="description"
                className="col-span-4 flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Opisz swoją ofertę"
                {...register("description")}
                autoFocus={false}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" isLoading={isLoading}>
                Zapisz
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOfferForm;
