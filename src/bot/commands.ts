import { registerFont } from "canvas";
import { Message } from "discord.js";
import animeFind from './command_handler/animeFind';
registerFont('./public/MPLUS.ttf', { family: 'MPLUS' });


const commandMap: Map<string, (msg: Message) => Promise<void>> = new Map();

commandMap.set("anime", animeFind);


export default commandMap;