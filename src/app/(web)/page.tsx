import User, { TrainerType } from "@/model/user";
import initMongoose from "@/lib/db";
import LandingPage from "@/components/landing/LandingPage";
import Article, { ArticleType } from "@/model/article";

interface pageProps {}

export interface mongooseTrainersData extends TrainerType {
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const getPageData = async (): Promise<[TrainerType[], ArticleType[]]> => {
  await initMongoose();

  const trainers: TrainerType[] = await User.find({
    isTrainer: true,
    image: new RegExp(".*"),
  })
    .limit(10)
    .sort("-createdAt")
    .lean()
    .exec();
  const articles: ArticleType[] = await Article.find({
    published: true,
    slug: new RegExp(".*"),
  })
    .limit(4)
    .sort("-createdAt")
    .lean()
    .exec();
  return [trainers, articles];
};

const Page = async ({}: pageProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const [trainersData, articles] = await getPageData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://coachbase.pl/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://coachbase.pl/search?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage
        articles={articles}
        jsonData={JSON.stringify(trainersData)}
      />
    </>
  );
};

export default Page;
