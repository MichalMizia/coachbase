import User, { TrainerType } from "@/model/user";
import initMongoose from "../db";

export async function fetchTrainer(slug: string, lean: boolean = true) {
  try {
    await initMongoose();
  } catch (e) {
    // return null
    throw new Error("Błąd łączenia z bazą danych");
  }

  console.log("Mongoose connected");
  try {
    if (lean) {
      const trainer: TrainerType = await User.findOne({
        isTrainer: true,
        slug: slug,
      })
        .lean()
        .exec();
      return trainer;
    }

    const trainer: TrainerType = await User.findOne({
      isTrainer: true,
      slug: slug,
    })
      .lean()
      .exec();
    return trainer;
  } catch (e) {
    // return null
    throw new Error("Błąd pobierania z bazy danych");
  }
}
export async function fetchTrainerFromEmail(
  email: string,
  lean: boolean = true
) {
  try {
    await initMongoose();
  } catch (e) {
    // return null
    throw new Error("Błąd łączenia z bazą danych");
  }

  console.log("Mongoose connected");
  try {
    if (lean) {
      const trainer: TrainerType = await User.findOne({
        isTrainer: true,
        email: email,
      })
        .lean()
        .exec();
      return trainer;
    }

    const trainer: TrainerType = await User.findOne({
      isTrainer: true,
      email: email,
    }).exec();
    return trainer;
  } catch (e) {
    // return null
    throw new Error("Błąd pobierania z bazy danych");
  }
}
