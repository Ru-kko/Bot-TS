import { Guild, MessageEmbed } from "discord.js";
import { Servers } from "@bot/db";
import bot from "../index"
export async function guildCreate(guild: Guild) {
  const serverManager = new Servers();
  await serverManager.putServer(guild?.id).catch(async () => {
    await serverManager.deleteServer(guild?.id);
    await serverManager.putServer(guild?.id);
    serverManager.close();
  });
  const embed = new MessageEmbed()
    .setTitle("Hi everyone!!")
    .setURL("https://youtu.be/dQw4w9WgXcQ")
    .setAuthor(
      bot.client.user?.username!,
      bot.client.user?.avatarURL() ||
        "https://cdn.discordapp.com/app-icons/879945146869899294/82f01e5d30f012279d2a3c4430b0a27b.png?size=256"
    )
    .setColor("GREEN")
    .setDescription(
      "\n\n Hello everyone again, thanks for inviting me to this server, " +
        "You can use the `waifu help` command to see the list of commands and the `waifu init`" +
        "command if you are an administrator to install the moderation settings."
    );

  guild?.systemChannel?.send({ embeds: [embed] });
}
