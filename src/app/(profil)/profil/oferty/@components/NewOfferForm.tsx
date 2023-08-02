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
import { offerOptionNames, offerOptions } from "@/config/global";
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
  pricePer: z
    .union([z.literal("1h"), z.literal("2h"), z.literal("Trening")])
    .optional(),
  duration: z.string().min(3).max(20).optional(),
  amountOfWorkouts: z.number().optional(),
});

type FormData = z.infer<typeof NewOfferSchema>;

const NewOfferForm = ({ userId }: NewOfferFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(NewOfferSchema),
  });
  const { isLoading, setIsLoading } = useLoadingStore();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setIsLoading(true);

    try {
      const reqPayload: any = {
        userId,
        name: data.name,
        description: data.description,
        price: data.price,
      };
      reqPayload.pricePer = data.pricePer;
      reqPayload.duration = data.duration;
      reqPayload.amountOfWorkouts = data.amountOfWorkouts;
      const res = await axios.post("/api/oferty", reqPayload);

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
      toast.error("Sorki to jeszcze nie działa, już niedługo");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const selectedOfferName = form.watch("name") || "Trening Personalny";
  const selectedOffer = offerOptions.find(
    (opt) => opt.name === selectedOfferName
  );

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
              <div className="grid grid-cols-3 items-center gap-x-2 gap-y-1">
                <Label htmlFor="select" className="col-span-2 text-gray-800">
                  Oferta
                </Label>
                <Label htmlFor="price" className="col-span-1 text-gray-800">
                  Cena
                </Label>

                {/* <Select
                  defaultValue="Trening Personalny"
                  onValueChange={setSelectedOfferName}
                >
                  <SelectTrigger className="col-span-2">
                    <SelectValue
                      {...form.register("name")}
                      placeholder="Wybierz opcję oferty"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {offerOptionNames.map((name) => (
                      <SelectItem value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue="Trening Personalny"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
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
                          {offerOptionNames.map((name) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="col-span-1 flex h-10 w-full overflow-hidden rounded-md border border-gray-300  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
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
              </div>
              <div className="grid grid-cols-5 items-center gap-x-2 gap-y-1">
                {selectedOffer?.fields?.pricePer ? (
                  <>
                    <Label
                      htmlFor="length-select"
                      className="text-gray-800 [grid-column:1_/_span_3]"
                    >
                      Czas trwania
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        register("duration", { setValueAs: (val) => value })
                      }
                      defaultValue={selectedOffer.fields.pricePer[0]}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Wybierz opcję oferty" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedOffer.fields.pricePer.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.pricePer && (
                      <p className="text-sm text-red-600">
                        {errors.pricePer.message}
                      </p>
                    )}
                  </>
                ) : null}
                {selectedOffer?.fields?.duration ? (
                  <>
                    <Label
                      htmlFor="duration"
                      className="col-span-3 text-gray-800"
                    >
                      Okres trwania
                    </Label>
                    <Input
                      type="text"
                      id="duration"
                      key="duration"
                      className="col-span-4"
                      {...register("duration")}
                      placeholder="Ile trwa ta oferta?"
                    />
                    {errors.duration && (
                      <p className="text-sm text-red-600">
                        {errors.duration.message}
                      </p>
                    )}
                  </>
                ) : null}
                {selectedOffer?.fields?.amountOfWorkouts ? (
                  <>
                    <Label
                      htmlFor="ilosc-treningow"
                      className="row-start-1 text-gray-800 [grid-column:4_/_span_2]"
                    >
                      Ilość treningów
                    </Label>
                    <Input
                      id="ilosc-treningow"
                      key="ilosc-treningow"
                      className="col-span-2"
                      type="number"
                      {...register("amountOfWorkouts", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.amountOfWorkouts && (
                      <p className="text-sm text-red-600">
                        {errors.amountOfWorkouts.message}
                      </p>
                    )}
                  </>
                ) : null}
              </div>

              <div className="grid grid-cols-5 items-center gap-1">
                <Label
                  htmlFor="description"
                  className="col-span-2 text-gray-800"
                >
                  Opis
                </Label>
                <TextareaAutosize
                  id="description"
                  key="description"
                  className="col-span-5 flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-4"
                  placeholder="Opisz swoją ofertę"
                  {...register("description")}
                />
              </div>
            </div>
            <DialogFooter>
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
