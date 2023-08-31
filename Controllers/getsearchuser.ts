import { Request, Response } from "express";
import { prisma } from "../dbclient";

export const getsearchuser = async (req: Request, res: Response) => {
  const { query } = req.body;

  try {
    const data = await prisma.user.findMany({
      where: {
        email: {
          not: req.session.user?.email,
          contains: query,
        },
      },
      select: { id: true, username: true, email: true, pic: true },
    });

    return res.json({ message: data });
  } catch (error) {
    console.log(error);
  }
};
