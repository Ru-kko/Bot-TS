import express, { Application, json, urlencoded } from "express";
import { Server as HTTP } from "http";
import { Server as HTTPS } from "https";
import sesion from "express-session";
import cors from "cors";
import servers from "./routes/servers.routes";
import authRouter from "./routes/auth.routes";
import SessionStorage from "./middlewares/sessionStorage";
import getCookieSid from "./middlewares/CookieSid";

class server {
    public server: Application;
    public app: HTTP | HTTPS;

    constructor(private port: number, private test = false) {
        this.server = express();
    }

    start(): Promise<server> {
        return new Promise<server>((resolve, reject) => {
            try {
                this.server.set("trust proxy", 1);
                this.app = this.server.listen(this.port, () => {
                    if (!this.test) console.log("Server running on port " + this.port);
                    resolve(this);
                });
            }catch(e) {
                reject(new Error('Server not initialized'));
            }
        })
    }

    middlewares(): server {
        this.server.use(json());
        this.server.use(urlencoded({ extended: false }));
        this.server.use(
            sesion({
                secret:
                    process.env.Session_PSW ??
                    (() => {
                        console.log("ERROR Password env not found");
                        return "Password";
                    })(),
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                },
                store: new SessionStorage(),
            })
        );
        this.server.use(getCookieSid);
        this.server.use(cors());

        return this;
    }

    routes(): server {
        this.server.use("/server", servers);
        this.server.use("/auth", authRouter);
        return this;
    }
}

export default server;
