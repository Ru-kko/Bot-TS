import { Message } from "discord.js";
import Crud from "../../crud/crud";

export default async (message: Message) => {
    const guild = message.guild;
    const msg = message.content.split(' ');
    if (guild) {
        if (msg.length == 3) {
            if (msg[2].length <= 5 && msg[2].length > 0) {
                const member = await guild.members.fetch(message.author.id);
                if (member.permissions.has('ADMINISTRATOR')) {
                    await Crud.setServerPrefix(guild.id, msg[2]);
                    message.reply('the prefix was changed')
                };
            } else {
                message.reply('the prefix cannot have more than 5 characters and less than 1')
            }
        } else {
            const prx = await Crud.getServerPrefix(guild.id);
            message.reply('the prefix is ' + prx);
        }
    }
}