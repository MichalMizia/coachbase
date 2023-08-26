import initMongoose from "../db";
import PendingRequest, { PendingRequestType } from "@/model/pendindRequest";

export async function fetchAllPendingRequests(): Promise<PendingRequestType[]> {
  try {
    await initMongoose();
  } catch (e) {
    // return null
    throw new Error("Błąd łączenia z bazą danych");
  }

  console.log("Mongoose connected");
  try {
    const requests = await PendingRequest.find({}).lean().exec();
    return requests;
  } catch (e) {
    // return null
    throw new Error("Błąd pobierania z bazy danych");
  }
}
