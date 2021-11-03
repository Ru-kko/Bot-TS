import express, { Application, json, urlencoded } from "express";
import env from 'dotenv';
import servers from "./routes/servers.routes";
import memberRouter from "./routes/members.routes";

const server = new class{
    public app:Application;

    constructor(){
        this.app = express();
    }

    start(){
        this.app.listen(process.env.PORT, () => {
            console.log("Server running on port " + process.env.PORT);
        });
    }

    middlewares(){
        this.app.use(json());
        this.app.use(urlencoded({extended: false}));
    }

    routes(){
        this.app.use('/server', servers);
        this.app.use('/members', memberRouter);
    }
}

env.config();

server.start();
server.middlewares();
server.routes();