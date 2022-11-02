import { configure } from "@bot/config/dist/configuration";
import { Server } from "@bot/api";
import bot from "@bot/bot"

async function main() {
  await configure();

  const sv = new Server(parseInt(process.env.PORT));
  sv.middlewares().routes().start();
  
  bot.new()
}

main();