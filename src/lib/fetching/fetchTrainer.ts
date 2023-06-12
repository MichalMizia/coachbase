import User, { TrainerType } from "@/model/user";
import initMongoose from "../db/db";

export async function fetchTrainer(slug: string) {
  try {
    await initMongoose();
  } catch (e) {
    // return null
    throw new Error("Błąd łączenia z bazą danych");
  }

  console.log("Mongoose connected");
  try {
    const trainer = await User.find({
      isTrainer: true,
      slug: slug,
    }).exec();
    return trainer;
  } catch (e) {
    // return null
    throw new Error("Błąd pobierania z bazy danych");
  }
}
