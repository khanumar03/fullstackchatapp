import { Request, Response } from "express";
import { prisma } from "../dbclient";
import { User } from "../types/CustomInterface";

export const createUser = async (req: Request, res: Response) => {
  const { email, username, pic, authID } = req.body;
  req.session.user = null;

  // if (req.session.user) {
  //   return res
  //     .status(201)
  //     .json({ message: "Already logined", data: req.session.user });
  // }
  const isUserExisted = await prisma.user.findUnique({
    where: { email },
    include: { friends: true },
  });
  if (isUserExisted) {
    req.session.user = {
      id: isUserExisted.id,
      email: isUserExisted.email,
      username: isUserExisted.username,
      pic: isUserExisted.pic as string,
      authID: isUserExisted.authID,
      friends: isUserExisted.friends as User[],
      Allconverstions: isUserExisted.Allconverstions,
      friendsRequest: isUserExisted.friendsRequest,
      ID: isUserExisted.ID,
      joinedAt: isUserExisted.joinedAt,
    };
    return res
      .status(201)
      .json({ message: "Successfully login", data: req.session.user });
  }
  await prisma.user
    .create({
      data: {
        email,
        username,
        pic,
        authID,
      },
      include: { friends: true },
    })
    .then((saved) => {
      req.session.user = {
        id: saved.id,
        email: saved.email,
        username: saved.username,
        pic: saved.pic as string,
        authID: saved.authID,
        friends: saved.friends as User[],
        Allconverstions: saved.Allconverstions,
        friendsRequest: saved.friendsRequest,
        ID: saved.ID,
        joinedAt: saved.joinedAt,
      };
      return res
        .status(200)
        .json({ message: "registration successful", data: req.session.user });
    })
    .catch((err) => console.log(err));
};
