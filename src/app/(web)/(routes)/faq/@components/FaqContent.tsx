import { FaqItem, faqItemsHeader, faqItemsMain } from "@/config/faq";
import { useMemo } from "react";

interface FaqContentProps {
  active: string;
}

const FaqContent = ({ active }: FaqContentProps) => {
  const allItems: FaqItem[] = useMemo(() => {
    return faqItemsHeader.concat(faqItemsMain);
  }, []);

  return (
    <div className="container-md small-article flow max-w-4xl py-10 !text-slate-900">
      {allItems.find((item) => item.item === active)?.content}
    </div>
  );
};

export default FaqContent;
