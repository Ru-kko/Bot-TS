import { registerFont } from "canvas";
import { Message } from "discord.js";

import animeFind from './command_handler/animeFind';
import changePrefix from "./command_handler/changePrefix";
import chess from "./command_handler/chess";
import help from "./command_handler/help";
import init from "./command_handler/init";
import youtube from "./command_handler/youtube";

registerFont('./public/MPLUS.ttf', { family: 'MPLUS' });

const commandMap: Map<string, commandSpesifications> = new Map();

commandMap.set("anime", {method: animeFind, description: 'Find an anime wiht same or similar name'});
commandMap.set("help", {method: help, description: 'Show normal user commands'});
commandMap.set("prefix", {method: changePrefix, description: 'Show server prefix, if you are an admin you can change them'});
commandMap.set("init", {method: init, admin: true, description: 'If you\'re an admin'});
commandMap.set("chess", {method: chess, description: "PJoin in voice channel and play chess wiht your friends"});
commandMap.set("youtube", {method: youtube, description: "See youtube videos wiht your friends"});

export interface commandSpesifications {
    method: (msg: Message) => Promise<void>;
    description: string;
    admin?: Boolean;
}
export default commandMap;