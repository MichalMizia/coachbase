import User from "@/model/user";
import initMongoose from "../db/db";

export async function fetchAllTrainers() {
  try {
    await initMongoose();
  } catch (e) {
    // return null
    throw new Error("Błąd łączenia z bazą danych");
  }

  console.log("Mongoose connected");
  try {
    const trainers = await User.find({ isTrainer: true }).lean().exec();
    console.log(trainers);
    return trainers;
  } catch (e) {
    // return null
    throw new Error("Błąd pobierania z bazy danych");
  }
}
