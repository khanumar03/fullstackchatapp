import { Request, Response } from "express";
import { prisma } from "../dbclient";
import { ObjectId } from "mongodb";

export const acceptRequest = async (req: Request, res: Response) => {
  const { friendemail } = req.body;

  try {
    const conversation = await prisma.conversations.create({
      data: {},
    });

    await prisma.user.update({
      where: {
        email: req.session.user!.email,
      },
      data: {
        Allconverstions: {
          push: {
            id: conversation.id,
            email: friendemail,
          },
        },
        friends: {
          connect: {
            email: friendemail,
          },
        },
      },
    });

    const user = await prisma.user.update({
      where: {
        email: friendemail,
      },
      data: {
        Allconverstions: {
          push: {
            id: conversation.id,
            email: req.session.user!.email,
          },
        },
        friends: {
          connect: {
            email: req.session.user!.email,
          },
        },
      },
    });

    await prisma.user.updateMany({
      where: {
        email: req.session.user!.email,
      },
      data: {
        friendsRequest: {
          deleteMany: {
            where: {
              email: friendemail,
            },
          },
        },
      },
    });

    return res.status(201).json({
      message: "friend request accepted",
      data: {
        senderID: req.session.user?.id,
        receiverID: user.id,
        username: req.session.user?.username,
        requestemail: req.session.user?.email,
        pic: req.session.user?.pic,
      },
    });
  } catch (error) {}
};
