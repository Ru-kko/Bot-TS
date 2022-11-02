import session from "express-session";
import cors from "cors";
import express, { Application, json, urlencoded } from "express";
import { Server as HTTP } from "node:http";
import { Server as HTTPS } from "node:https";
import getCookieSid from "./middlewares/CookieSid";
import SessionStorage from "./middlewares/sessionStorage";
import "@bot/config/dist/configuration";
import authRouter from "./routes/auth.routes";
import tokenRefresh from "./middlewares/TokenRefresh";
import guilds from "./routes/servers.routes";
import userRouter from "./routes/user.routes";
import { PUBLIC } from "@bot/config/dist";

class Server {
  readonly app: Application;

  constructor(private port: number, private test = false) {
    this.app = express();
  }

  start(): Promise<HTTP | HTTPS> {
    console.log(PUBLIC.CLIENT_URL);
    
    return new Promise(async (resolve) => {
      this.app.set("trust proxy", 1);
      const res = this.app.listen(this.port, () => {
        if (!this.test) console.log("Server running on port", this.port);
        resolve(res);
      });
    });
  }

  middlewares(): Server {
    this.app.use(json(), urlencoded({ extended: false }));
    this.app.use(
      session({
        secret: process.env.COOKIE_PSW,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 30,
        },
        store: new SessionStorage(),
      })
    );
    this.app.use(getCookieSid);
    this.app.use(cors({ credentials: true, origin: PUBLIC.CLIENT_URL }));
    return this;
  }
  routes(): Server {
    this.app.use("/auth", authRouter);
    this.app.use("/servers", tokenRefresh, guilds);
    this.app.use("/user", tokenRefresh, userRouter);
    return this;
  }
}

export { Server };
