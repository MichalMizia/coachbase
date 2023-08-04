"use client";

import Button from "./ui/Button";

interface NewsletterFormProps {}

const NewsletterForm = ({}: NewsletterFormProps) => {
  return (
    <form className="my-1 flex-col items-stretch justify-stretch">
      <input
        type="text"
        placeholder="Twój email"
        className="w-[200px] rounded-sm bg-white px-3 py-2 text-gray-800 shadow-sm shadow-white/25 outline-none placeholder:text-slate-500 focus:border-2 focus:border-blue-400 focus:shadow-lg"
      />
      <Button
        variant="primary"
        className="mt-1 w-[200px] rounded-sm !text-white"
      >
        Zapisz się do Newslettera
      </Button>
    </form>
  );
};

export default NewsletterForm;
