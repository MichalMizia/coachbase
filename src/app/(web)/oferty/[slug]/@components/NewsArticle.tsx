"use client";

import { cn } from "@/lib/utils";
import { sanitize } from "isomorphic-dompurify";
import { useState } from "react";

interface NewsArticleProps {
  content: string;
}

const NewsArticle = ({ content }: NewsArticleProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div>
      <article
        className={cn("xsmall-article flow", isVisible ? "" : "line-clamp-4")}
        style={{ "--flow-space": "!0.2em" } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: sanitize(content) }}
      ></article>
      <button
        className="self-start text-sm text-text_readable transition-all hover:opacity-80 focus:underline focus:opacity-80"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? "Ukryj..." : "Pokaż Więcej..."}
      </button>
    </div>
  );
};

export default NewsArticle;
