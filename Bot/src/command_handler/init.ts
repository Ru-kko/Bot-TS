import axios from "axios";
import { Message, MessageEmbed, Permissions } from "discord.js";
import { restContent } from "./Interfaces/interfaces";

export default async (message: Message) => {
    const guild = message.guild;

    if (guild) {

        const logCh = await axios.get(process.env.BackPaht! + `/server/${guild.id}/log_channel`).then(inf =>{return (<restContent>inf.data).colunm! || '0'});
        const configCh =await axios.get(process.env.BackPaht! + `/server/${guild.id}/customizer_channel`).then(inf =>{return (<restContent>inf.data).colunm || '0'});

        const member = await guild.members.fetch(message.author.id);

        if (member.permissions.has('MANAGE_CHANNELS' || 'ADMINISTRATOR')) {
            const group = await guild.channels.create('STAF', {
                type: 'GUILD_CATEGORY', permissionOverwrites: [{
                    id: guild.id,
                    allow: [
                        Permissions.FLAGS.ADMINISTRATOR,
                        Permissions.FLAGS.MANAGE_CHANNELS,
                        Permissions.FLAGS.MANAGE_GUILD],
                    deny: [
                        Permissions.FLAGS.VIEW_CHANNEL
                    ]
                }]
            });

            if (configCh == '0') {
                await guild.channels.create('Config', { type: 'GUILD_TEXT', parent: group }).then(async channel => {
                    await axios.put(process.env.BackPaht! + `/server/${guild.id}/customizer_channel/${channel.id}`)
                });
            };

            if (logCh != '0') return;

            await guild.channels.create('Info', { type: 'GUILD_TEXT', parent: group }).then(async channel => {
                const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL()!)
                    .setColor('GREEN')
                    .setDescription(`<@${message.author.id}> was start moderation settings`)
                    .setTimestamp(Date.now());
                await axios.put(process.env.BackPaht! + `/server/${guild.id}/log_channel/${channel.id}`)
                channel.send({ embeds: [embed] });
            });
        }
    }
}