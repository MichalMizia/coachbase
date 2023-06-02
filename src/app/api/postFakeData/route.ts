// import { registerController } from "@/controllers/userController";
// import initMongoose from "@/lib/db/db";
// import { fakeData } from "@/lib/utils";
// import User from "@/model/user";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await initMongoose();
//   } catch (e) {
//     console.log("Failed connecting to database: ", e);
//     return NextResponse.json(
//       { message: "Failed connecting to database" },
//       { status: 500 }
//     );
//   }

//   console.log("Mongoose connected");

//   try {
//     for (let i = 0; i < fakeData.length; i++) {
//       await registerController.addNewUser(req, res, fakeData[i]);
//     }

//     // const usersDel = await User.deleteMany({}).exec()
//   } catch (e) {
//     console.log(e);
//     return NextResponse.json(
//       { message: "Failed creating users" },
//       { status: 400 }
//     );
//   }
//   return NextResponse.json({ message: "Created user" }, { status: 200 });
//   //   return NextResponse.json({ message: "hello" });
// }
