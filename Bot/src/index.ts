import env from "dotenv";
import server from "./api/api";
import Bot from "./bot/bot_runner";

async function main() {
    env.config();

    // Server
    const Server = new server(Number(process.env.PORT))
    Server.middlewares().routes();
    await Server.start();

    // Bot
    Bot();
}

main();
