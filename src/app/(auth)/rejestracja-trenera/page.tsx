// city data
import cities from "../../../config/data/miastaShort.json";
import { MappedCity } from "@/components/offers/OffersSearchbar";
import RegisterTrainerForm from "../@components/RegisterTrainerForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejestracja Trenera - Coachbase",
  description: "Zarejestruj konto trenera na coachbase.pl",
};

export default function Page() {
  let mappedCities: MappedCity[] = [];
  cities.forEach((region) => {
    if (region.cities) {
      region.cities.forEach((city) => {
        if (city?.text_simple) {
          mappedCities.push({ name: city.text_simple, id: city.id });
        }
      });
    }
  });

  return (
    <main>
      <RegisterTrainerForm cities={mappedCities} />
    </main>
  );
}
