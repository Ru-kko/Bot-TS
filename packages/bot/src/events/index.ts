import { ClientEvents } from "discord.js";
import { channelDelete } from "./channelDelete";
import { guildCreate } from "./guildCreate";
import { onMessage } from "./messages";

type eventHandler = {
  [key in keyof Partial<ClientEvents>]: (...args: ClientEvents[key]) => Promise<void> | void;
};

export const eventHandler: eventHandler = {
  channelDelete: channelDelete,
  guildCreate: guildCreate,
  messageCreate: onMessage,
  ready: () => console.log("Botts runnig")
};
