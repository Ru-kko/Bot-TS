import express, { Application, json, urlencoded } from 'express';
import servers from "./routes/servers.routes";
import memberRouter from "./routes/membres.routes";

const server = new class server{
    public app:Application;

    constructor(){
        this.app = express();
    }

    start(): server{
        this.app.listen(process.env.PORT, () => {
            console.log("Server running on port " + process.env.PORT);
        });
        return this;
    }

    middlewares(): server{
        this.app.use(json());
        this.app.use(urlencoded({extended: false}));
        return this;
    }

    routes(): server{
        this.app.use('/server', servers);
        this.app.use('/members', memberRouter);
        return this;
    }
}

export default server;