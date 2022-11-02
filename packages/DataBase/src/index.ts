import Members from "./tables/membres";
import Servers from "./tables/servers";
import SessionsDB from "./tables/sessions";
import Users from "./tables/users"

import "@bot/config/dist/configuration";


export { Members, Servers, SessionsDB, Users};

declare module "express-session" {
  interface SessionData {
    userid: string;
    code: string;
    token: {
      type: string;
      refresh: string;
      expires: number;
      token: string;
      create: string;
    };
  }
}