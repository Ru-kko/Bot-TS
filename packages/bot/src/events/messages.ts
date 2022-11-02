import { Message } from "discord.js";
import { Members, Servers } from "@bot/db";
import bot  from "../index";
import cmd from "../commands";

export async function onMessage(message: Message) {
  if (message.author.bot) return;
  const serverManager = new Servers();
  const memberManager = new Members(serverManager);
  const server = await serverManager.getServer(message.guild!.id, true);

  const content = message.content.split(" ");

  if (message.guild) {
    await memberManager.addXP(message.author.id, message.guild.id, Math.round(Math.random() * (10 - 5)) + 5);
  }
  if (content[0] === server.prefix || content[0] === `<@${bot.client.application?.id}>`) {
    const func = cmd.get(content[1]);
    if (func) func.method(message);
  }
  memberManager.close();
}
