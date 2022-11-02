import { Client } from "discord.js";
import { eventHandler } from "./events";

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "DIRECT_MESSAGES"],
});

export default {
  client,
  new: () => {
    Object.entries(eventHandler).forEach(([key,val])=> {
      client.on(key,  val)
    });
    client.login(process.env.DC_TOKEN);
  },
};
