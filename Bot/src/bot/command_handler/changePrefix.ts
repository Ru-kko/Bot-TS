import { Message, MessageEmbed, TextBasedChannels } from "discord.js";
import { servers } from "../../crud/tables/servers";
import { client } from "../bot_runner";

export default async (message: Message) => {
    const guild = message.guild;
    const msg = message.content.split(' ');
    if (guild) {
        if (msg.length == 3) {
            if (msg[2].length <= 5 && msg[2].length > 0) {
                const member = await guild.members.fetch(message.author.id);
                if (member.permissions.has('ADMINISTRATOR')) {
                    await servers.setColunm('prefix', guild.id, msg[2]);

                    const logId = await servers.getColunm('log_channel', guild.id);

                    if (logId != '0') {
                        const _channel = <TextBasedChannels>client.channels.cache.find(ch => ch.id == logId)!;

                        const embed = new MessageEmbed()
                            .setAuthor(member.displayName, message.author.avatarURL()!)
                            .setDescription(`<@${message.author.id}> was changed prefix **${msg[0]}** to **${msg[2]}**`)
                            .setColor('BLUE')
                            .setTimestamp(Date.now());

                        await _channel.send({ embeds: [embed] });
                    }

                    message.reply('the prefix was changed')
                };
            } else {
                message.reply('the prefix cannot have more than 5 characters and less than 1')
            }
        } else {
            const prx = await servers.getColunm('prefix', guild.id);
            message.reply('the prefix is ' + prx);
        }
    }
}