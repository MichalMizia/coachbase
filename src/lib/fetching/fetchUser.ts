import User, { TrainerType, UserType } from "@/model/user";
import initMongoose from "../db";
import TrainerData, { TrainerDataType } from "@/model/trainerData";

export async function fetchUser(email: string) {
  try {
    await initMongoose();
  } catch (e) {
    // return null
    throw new Error("Błąd łączenia z bazą danych");
  }

  try {
    // @ts-expect-error
    const user: UserType | TrainerType | null = await User.find({
      email: email,
    })
      .lean()
      .exec();
    let userData: TrainerDataType | null = null;
    if (user && user.isTrainer) {
      userData = await TrainerData.findOne({
        userSlug: user.slug,
      })
        .lean()
        .exec();
    }
    if (userData) {
      return { user, userData };
    } else {
      return { user };
    }
  } catch (e) {
    // return null
    throw new Error("Błąd pobierania z bazy danych");
  }
}
