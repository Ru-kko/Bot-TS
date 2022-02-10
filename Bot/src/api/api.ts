import express, { Application, json, urlencoded } from 'express';
import sesion, { Session } from 'express-session';
import cors from 'cors'
import servers from "./routes/servers.routes";
import memberRouter from "./routes/membres.routes";
import authRouter from './routes/auth.routes';
import SessionStorage from './middlewares/sessionStorage';
import getCookieSid  from './middlewares/CookieSid';

const server = new class server {
    public app: Application;

    constructor() {
        this.app = express();
    }

    start(): server {
        this.app.listen(process.env.PORT, () => {
            console.log("Server running on port " + process.env.PORT);
        });
        this.app.set('trust proxy', 1);
        return this;
    }

    middlewares(): server {
        this.app.use(json());
        this.app.use(cors())
        this.app.use(urlencoded({ extended: false }));
        this.app.use(getCookieSid);
        return this;
    }

    routes(): server {
        const authSess = sesion({
            secret: process.env.Session_PSW ?? (() => { console.log('ERROR Password env not found'); return 'Password' })(),
            resave: false,
            saveUninitialized: false,
            cookie: { 
                maxAge: 1000* 60 * 60 *24 * 30
            },
            store: new SessionStorage()
        })

        this.app.use('/server', servers);
        this.app.use('/members', memberRouter);
        this.app.use('/auth', authSess, authRouter);
        return this;
    }
}

export default server;