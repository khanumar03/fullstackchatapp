// require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import { router } from "./Router";
import { mongo, prisma } from "./dbclient";
import session from "express-session";
import MongoStore from "connect-mongo";
import { User } from "./types/CustomInterface";
import { Server } from "socket.io";
import http from "http";

const app: Application = express();
const server = http.createServer(app);

const store = new MongoStore({
  client: mongo,
  collectionName: "session",
  stringify: false,
});


const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

declare module "express-session" {
  interface SessionData {
    user: User | null;
  }
}

async function _main() {
  await mongo.connect().catch((err) => console.log(err));

  app.use(express.json());
  app.use(
    session({
      name: "qid",
      store: store,
      cookie: {
        maxAge: 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
      },
      secret: "qwdfqfefgsrgsdfsfdfs",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );
  app.use("/api", router);

  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("clientroom", (data: { id: string; email: string }) => {
      socket.join(data.id);
      console.log(`id:${data.id} email:${data.email}`);
    });

    socket.on("notify", (data) => {
      console.log(data);

      io.to(data.receiverID).emit("receivenotification", data);
    });

    socket.on("sendmessage", (data) => {
      console.log(data);

      socket.to(data.receiver).emit("receive", data);
    });

    socket.on("typinghandler", (data) => {
      console.log(data);

      socket.to(data.id).emit("typingstate", data);
    });

    socket.on("disconnect", () => console.log("user  left"));
  });

  app.get("/", (req, res) =>
    res.status(404).json({ message: "route not found" })
  );

  server.listen(5000, () => console.log("server  connected"));
}

_main().catch((err) => console.log(err));
