import env from 'dotenv';
import server from './api/api';
import Bot from './bot/bot_runner';

function main() {
    env.config();

    // Server
    server
        .start()
        .middlewares()
        .routes();

    // Bot
    Bot();
}

main();