import { Request, Response, Express } from "express";
import { prisma } from "../dbclient";
import { User } from "../types/CustomInterface";

export const getcurrentchatdata = async (req: Request, res: Response) => {
  const { friendemail } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.session.user?.email,
      },
      select: { Allconverstions: true },
    });

    const conversationid = user?.Allconverstions.find(
      (data) => data.email === friendemail
    );

    const chat = await prisma.conversations.findUnique({
      where: {
        id: conversationid?.id,
      },
    });

    return res.status(201).json({ chat: chat });
  } catch (error) {
    console.log(error);
  }
};
