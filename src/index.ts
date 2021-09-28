import express, {Application} from 'express';
import env from 'dotenv';
import bot from './bot/bot_runner';

const server = new class{
    public app:Application;
    constructor(){
        this.app = express();
    };
    start():void{
        this.app.listen(4000, ()=>{
            bot();
            console.log("Server initialized");
        });
    }
}
env.config();
server.start();