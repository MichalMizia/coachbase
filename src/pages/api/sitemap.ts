import cities from "@/config/data/search-cities.json";
import { NextApiRequest, NextApiResponse } from "next";
import { tagOptions } from "@/config/global";
import initMongoose from "@/lib/db";
import TrainerData, { TrainerDataType } from "@/model/trainerData";

const getTrainers = async () => {
  await initMongoose();

  const trainers: TrainerDataType[] = await TrainerData.find({}).lean().exec();

  return trainers;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  const trainers = await getTrainers();

  const currentDate = `${new Date(Date.now()).toISOString().split("T")[0]}`;

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      <url>
        <loc>https://coachbase.pl/</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
      <url>
        <loc>https://coachbase.pl/oferty</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
      <url>
        <loc>https://coachbase.pl/oferty?city=rzeszow</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
      <url>
        <loc>https://coachbase.pl/oferty?tag=trener</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
      <url>
        <loc>https://coachbase.pl/blog</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
      ${trainers.map(
        (trainer) => `<url>
        <loc>https://coachbase.pl/oferty/${trainer.userSlug}</loc>
        <lastmod>${currentDate}</lastmod>
      </url>`
      )}
      <url>
        <loc>https://coachbase.pl/faq</loc>
        <lastmod>2023-08-16</lastmod>
      </url>
      </urlset>`;

  res.end(xml);
}

// paste later

// ${tagOptions.map(
//   (opt) => `<url>
//   <loc>https://coachbase.pl/oferty?tag=${opt.value}</loc>
//   <lastmod>${currentDate}</lastmod>
// </url>`
// )}
// ${cities.map(
//   (city) => `<url>
//   <loc>https://coachbase.pl/oferty?city=${city.value.toLowerCase()}</loc>
//   <lastmod>${currentDate}</lastmod>
// </url>`
// )}
