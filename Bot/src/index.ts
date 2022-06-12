import Canvas from "canvas";
import path from "node:path";
import env from "dotenv";
import server from "./api/api";
import Bot from "./bot/bot_runner";

async function main() {
    env.config();
    // canvas
    Canvas.registerFont(path.join(__dirname, "../public/MPLUS.ttf"), { family: "MPLUS" });

    // Server
    const Server = new server(Number(process.env.PORT))
    Server.middlewares().routes();
    await Server.start();

    // Bot
    Bot();
}

main();
