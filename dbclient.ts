import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";

export const prisma = new PrismaClient();
export const mongo = new MongoClient(process.env.DATABASE_URL as string);

mongo
  .db("test")
  .collection("User")
  .watch(
    [
      {
        $match: {
          operationType: "update",
        },
      },
    ],
    {
      fullDocument: "updateLookup",
    }
  )
  .on("change", (next) => {
    if (next.operationType === "update") {
      // console.log(next.fullDocument);
    }
  });
