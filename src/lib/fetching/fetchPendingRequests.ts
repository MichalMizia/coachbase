import initMongoose from "../db/db";
import PendingRequest from "@/model/pendindRequest";

export async function fetchAllPendingRequests() {
  try {
    await initMongoose();
  } catch (e) {
    // return null
    throw new Error("Błąd łączenia z bazą danych");
  }

  console.log("Mongoose connected");
  try {
    const requests = await PendingRequest.find({});
    return requests;
  } catch (e) {
    // return null
    throw new Error("Błąd pobierania z bazy danych");
  }
}
