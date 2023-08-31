import { Request, Response } from "express";
import { prisma } from "../dbclient";

export const declineRequest = async (req: Request, res: Response) => {
  const { friendemail } = req.body;

  await prisma.user.update({
    where: {
      email: req.session.user?.email,
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

  return res.status(201).json({ message: "request decline" });
};
