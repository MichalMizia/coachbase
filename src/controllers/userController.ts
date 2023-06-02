const bcrypt = require("bcrypt");
import User from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";

interface newUser {
  username: string;
  email: string;
  password: string;
}

// wersja 2 z nextApiResponse
const addNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req) {
    return res.status(400).json({ message: "Zły request" });
  }

  // typescript throws an error because these properties might not exist on req.body and I dont know how to get around that
  const { username, email, password }: newUser = req.body;
  console.log(username, email, password);

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Wszystkie pola są wymagane" });
  }

  const duplicateUsername = await User.findOne({ username: username })
    .lean()
    .exec();
  if (duplicateUsername) {
    return res.status(409).json({ message: "Konto z tą nazwą już istnieje" });
  }
  const duplicateEmail = await User.findOne({ email: email }).lean().exec();
  if (duplicateEmail) {
    return res
      .status(409)
      .json({ message: "Do tego adresu email przypisane jest już konto" });
  }

  const hashedPwd = await bcrypt.hash(password, 10); //10 is the number of hash salts

  // kiedy uzytkownik nie jest trenerem
  const user = await User.create({
    username,
    password: hashedPwd,
    email,
    isTrainer: false,
    emailVerified: false,
  });

  if (user) {
    return res.status(201).json({ message: `Utworzono konto: ${username}` });
  } else {
    return res.status(400).json({ message: "Nieprawidłowe dane użytkownika" });
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //to do - delete user posts

  const result = await user.deleteOne();

  res.json({ message: `Username ${result.username} deleted` });
};

const updateUsername = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, newUsername } = req.body;
  if (!username?.length || !newUsername?.length) {
    res
      .status(400)
      .json({ message: "Stara i nowa nazwa użytkownika są wymagane" });
  }

  const user = await User.findOne({ username: username }).exec();

  if (!user) {
    return res
      .status(400)
      .json({ message: "Nie znaleziono użytkownika z początkową nazwą" });
  }

  const duplicateName = await User.findOne({ username: newUsername });

  if (duplicateName) {
    return res.status(409).json({ message: "Ta nazwa jest już zajęta" });
  }

  user.username = newUsername;

  try {
    await user.save();
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Nie udało się zmienić nazwy użytkownika" });
  }

  return res
    .status(200)
    .json({ message: "Nazwa użytkownika została zmieniona" });
};

export const registerController = {
  addNewUser,
  deleteUser,
  updateUsername,
};

// const addNewUser = async (request: NextRequest, response: NextResponse) => {
//   const req = await request.json();
//   if (!req) {
//     return NextResponse.json(
//       { message: "All fields are required" },
//       { status: 400 }
//     );
//   }

//   // typescript throws an error because these properties might not exist on req.body and I dont know how to get around that
//   const { username, email, password }: newUser = req;
//   console.log(username, email, password);

//   if (!username || !email || !password) {
//     return NextResponse.json(
//       { message: "All fields are required" },
//       { status: 400 }
//     );
//   }

//   const duplicateUsername = await User.findOne({ username: username })
//     .lean()
//     .exec();
//   if (duplicateUsername) {
//     return NextResponse.json(
//       { message: "Konto z tą nazwą już istnieje" },
//       { status: 409 }
//     );
//   }
//   const duplicateEmail = await User.findOne({ email: email }).lean().exec();
//   if (duplicateEmail) {
//     return NextResponse.json(
//       { message: "Do tego adresu email przypisane jest już konto" },
//       { status: 400 }
//     );
//   }

//   const hashedPwd = await bcrypt.hash(password, 10); //10 is the number of hash salts

//   // kiedy uzytkownik nie jest trenerem
//   const user = await User.create({
//     username,
//     password: hashedPwd,
//     email,
//     isTrainer: false,
//     emailVerified: false,
//   });

//   if (user) {
//     return NextResponse.json(
//       { message: `Utworzono konto: ${username}` },
//       { status: 201 }
//     );
//   } else {
//     return NextResponse.json(
//       { message: "Nieprawidłowe dane użytkownika" },
//       { status: 400 }
//     );
//   }
// };
