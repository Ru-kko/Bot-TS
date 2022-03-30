import { Message, MessageEmbed, TextBasedChannel } from "discord.js";
import { Servers } from "../../crud/tables/servers";
import { client } from "../bot_runner";

export default async (message: Message) => {
    const guild = message.guild;
    const msg = message.content.split(' ');
    if (guild) {
    	const serverManager = new Servers();
		const server = await serverManager.getServer(guild.id);
        if (msg.length == 3) {
            if (msg[2].length <= 5 && msg[2].length > 0) {
                const member = await guild.members.fetch(message.author.id);
                if (member.permissions.has('ADMINISTRATOR')) {
					await serverManager.setColunm(['prefix', msg[0]], guild.id);

                    const logId = server.log_channel; 

                    if (logId !== 0) {
                        const _channel = <TextBasedChannel>client.channels.cache.find(ch => ch.id === String(logId))!;

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
            message.reply('the prefix is ' + server.prefix);
        }
		serverManager.close();
    }
}
