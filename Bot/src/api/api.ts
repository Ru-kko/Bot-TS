import express, { Application, json, urlencoded } from 'express';
import { Server as HTTP } from 'http';
import { Server as HTTPS } from 'https';
import sesion from 'express-session';
import cors from 'cors'
import servers from "./routes/servers.routes";
import authRouter from './routes/auth.routes';
import SessionStorage from './middlewares/sessionStorage';
import getCookieSid from './middlewares/CookieSid';

class server {
    public server: Application;
    public app: HTTP | HTTPS;

    constructor(private port: number, private log = true) {
        this.server = express();
    }

    start(): server {
        this.app = this.server.listen(this.port, () => {
            if (this.log)
                console.log("Server running on port " + this.port);
        });
        this.server.set('trust proxy', 1);
        return this;
    }

    middlewares(): server {
        this.server.use(json());
        this.server.use(cors())
        this.server.use(urlencoded({ extended: false }));
        this.server.use(sesion({
            secret: process.env.Session_PSW ?? (() => { console.log('ERROR Password env not found'); return 'Password' })(),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 30
            },
            store: new SessionStorage()
        }));
        this.server.use(getCookieSid);
        return this;
    }

    routes(): server {
        this.server.use('/server', servers);
        this.server.use('/auth', authRouter);
        return this;
    }
}

export default server;
