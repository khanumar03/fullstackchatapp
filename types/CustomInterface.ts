import { conversation } from "@prisma/client";

export interface User {
  id: string;
  username: string;
  email: string;
  pic: string;
  authID: string;
  friends: User[];
  Allconverstions?: ({
    id: string | null;
    email: string | null;
  } & {})[];
  friendsRequest: ({
    id: string | null;
    username: string | null;
    email: string | null;
    pic: string | null;
  } & {})[];
  ID: string | null;
  joinedAt: Date;
}
