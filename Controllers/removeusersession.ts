// import { Request, Response } from "express";
// import { mongo } from "../dbclient";

// export const removeUserSession = async (req: Request, res: Response) => {
//   const { email } = req.body;
//   req.session.user = null;
//   await mongo
//     .db("test")
//     .collection("session")
//     .deleteMany({
//       "session.user.email": email,
//     })
//     .then((del) => {
//       console.log(del);
//       //   return res.status(200).json({ message: del });
//     })
//     .catch((err) => console.log(err));
//   //   return res.status(203).json({ message: "err" });
// };
