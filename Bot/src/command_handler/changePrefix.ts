import axios from "axios";
import { Message, MessageEmbed, TextBasedChannels } from "discord.js";
import { client } from "..";
import { restContent } from "./Interfaces/interfaces";

export default async (message: Message) => {
    const guild = message.guild;
    const msg = message.content.split(' ');
    if (guild) {
        if (msg.length == 3) {
            if (msg[2].length <= 5 && msg[2].length > 0) {
                const member = await guild.members.fetch(message.author.id);
                if (member.permissions.has('ADMINISTRATOR')) {
                    await axios.put(process.env.BackPaht! + `/server/${guild.id}/colunm/prefix/${msg[2]}`);

                    const logId = await axios.get(process.env.BackPaht! + `/server/${guild.id}/colunm/log_channel`).then(inf =>{return (<restContent>inf).colunm!});

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
            const prx = await axios.get(process.env.BackPaht + `/server/${guild.id}/colunm/prefix`).then(inf =>{return  (<restContent>inf).colunm!});
            message.reply('the prefix is ' + prx);
        }
    }
}