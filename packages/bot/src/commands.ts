import { registerFont } from "canvas";
import { Message } from "discord.js";
import path from "node:path";

import animeFind from './command_handler/animeFind';
import changePrefix from "./command_handler/changePrefix";
import help from "./command_handler/help";
import init from "./command_handler/init";

registerFont(path.join(__dirname, '../public/MPLUS.ttf'), { family: 'MPLUS' });

const commandMap: Map<string, commandSpesifications> = new Map();

commandMap.set("anime", {method: animeFind, description: 'Find an anime wiht same or similar name'});
commandMap.set("help", {method: help, description: 'Show normal user commands'});
commandMap.set("prefix", {method: changePrefix, description: 'Show server prefix, if you are an admin you can change them'});
commandMap.set("init", {method: init, admin: true, description: 'If you\'re an admin'});

export interface commandSpesifications {
    method: (msg: Message) => Promise<void>;
    description: string;
    admin?: Boolean;
}
export default commandMap;