import express, { Request, Response, Express, query } from "express";
import { createUser } from "./Controllers/createUser";
import { addFriend } from "./Controllers/addFriend";
import { acceptRequest } from "./Controllers/acceptrequest";
// import { removeUserSession } from "./Controllers/removeusersession";
import { declineRequest } from "./Controllers/declinerequest";
import { prisma } from "./dbclient";
import { ObjectId } from "mongodb";
import { getcurrentchatdata } from "./Controllers/getcurrentchatdata";
import { sendmessage } from "./Controllers/sendmessage";
import { getsearchuser } from "./Controllers/getsearchuser";
// import usersession from "./middleware/usersession";

export const router: express.IRouter = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.update({
      where: {
        email: "testingdev9594@gmail.com",
      },
      data: {
        friends: {
          disconnect: {
            email: "testingdevelopment289@gmail.com",
          },
        },
      },
      include: { friends: true },
    });
    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addfriend", addFriend);
router.post("/createuser", createUser);
router.post("/acceptrequest", acceptRequest);
router.post("/declinerequest", declineRequest);
router.post("/getcurrentchatdata", getcurrentchatdata);
router.put("/sendmessage", sendmessage);
router.post("/getsearchuser", getsearchuser);
