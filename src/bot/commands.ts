import { registerFont } from "canvas";
import { Message } from "discord.js";

import animeFind from './command_handler/animeFind';
import changePrefix from "./command_handler/changePrefix";
import help from "./command_handler/help";

registerFont('./public/MPLUS.ttf', { family: 'MPLUS' });

const commandMap: Map<string, commandSpesifications> = new Map();

commandMap.set("anime", {method: animeFind, description: 'Find an anime wiht same or similar name'});
commandMap.set("help", {method: help, description: 'Show normal user commands'});
commandMap.set("prefix", {method: changePrefix, description: 'show server prefix, if you are an admin you can change them'});

export interface commandSpesifications {
    method: (msg: Message) => Promise<void>;
    description?: string;
    admin?: Boolean;
}
export default commandMap;