import TrainerData from "@/model/trainerData";
import initMongoose from "../db/db";

export async function fetchTrainerData(slug: string) {
  try {
    await initMongoose();
  } catch (e) {
    // return null
    throw new Error("Błąd łączenia z bazą danych");
  }

  console.log("Mongoose connected");
  try {
    const trainerData = await TrainerData.find({ slug: slug }).exec();
    return trainerData;
  } catch (e) {
    // return null
    throw new Error("Błąd pobierania z bazy danych");
  }
}
