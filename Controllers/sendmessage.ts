import { Request, Response, Express } from "express";
import { prisma } from "../dbclient";

export const sendmessage = async (req: Request, res: Response) => {
  const { receiverid, text, conversationid, receiverpic } = req.body;
  await prisma.conversations
    .update({
      where: {
        id: conversationid,
      },
      data: {
        messages: {
          push: {
            sender: req.session.user!.id,
            receiver: receiverid,
            text: text,
            senderpic: req.session.user!.pic,
            receiverpic: receiverpic,
          },
        },
      },
    })
    .then((saved) => {
      return res.status(201).json({ message: "message sent", data: saved });
    })
    .catch((err) => console.log(err));
};
