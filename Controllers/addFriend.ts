import { Request, Response, Express } from "express";
import { prisma } from "../dbclient";
import { User } from "../types/CustomInterface";

export const addFriend = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (email === req.session.user?.email) {
    return res.status(203).json({ message: "you can not add yourself" });
  }
  const isUserExisted = (await prisma.user.findUnique({
    where: { email },
    include: { friends: true },
  })) as User;
  if (!isUserExisted) {
    return res.status(203).json({ message: "user with this email not exist" });
  }
  const requestuser = await prisma.user.findUnique({
    where: {
      email: req.session.user?.email,
    },
    select: {
      friendsRequest: true,
    },
  });
  const hasRequest = requestuser?.friendsRequest.some(
    (friend) => friend.email === email
  );
  if (hasRequest) {
    return res
      .status(200)
      .json({ message: "You have friend request with this email" });
  }
  const data = isUserExisted.friendsRequest.filter(
    (request) => request.email === req.session.user!.email
  );
  if (data.length > 0) {
    return res.status(203).json({ message: "Already sent request" });
  }
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      friendsRequest: {
        push: {
          id: req.session.user!.id,
          username: req.session.user!.username,
          email: req.session.user!.email,
          pic: req.session.user!.pic,
        },
      },
    },
  });
  res.status(201).json({
    message: "request send",
    data: {
      senderID: req.session.user?.id,
      receiverID: isUserExisted.id,
      username: req.session.user?.username,
      requestemail: req.session.user?.email,
      pic: req.session.user?.pic,
    },
  });
};
