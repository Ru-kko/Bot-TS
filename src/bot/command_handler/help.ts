import { ColorResolvable, Message, MessageEmbed } from "discord.js";
import commandMap, { commandSpesifications } from "../commands";

export default async (message: Message) => {
    let newMsg = '';
    const breack = null;
    let count: number = 0;

    commandMap.forEach((i: commandSpesifications, k: String) => {
        try {
            if (!i.admin && i.description && (k != "help")) {
                count++;
                newMsg += '``' + k + ':`` ' + i.description + '\n'; 
                if (count >= 10) throw breack;
            }
        } catch (e) {
            if (e != breack) throw e;
        }
    });

    newMsg += '\n[``more``](https://youtu.be/dQw4w9WgXcQ)';

    const embed = new MessageEmbed()
        .setTitle('Commands')
        .setDescription(newMsg)
        .setURL('https://youtu.be/dQw4w9WgXcQ')
        .setColor(<ColorResolvable>'GREEN');

    message.channel.send({embeds: [embed]});
}