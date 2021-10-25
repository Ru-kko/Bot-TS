import { Message, MessageEmbed, Permissions } from "discord.js";
import Crud from "../../crud/crud";

export default async (message: Message) => {
    const guild = message.guild;

    if (guild) {

        const logCh = await Crud.getColunm('log_channel', guild.id);
        const configCh = await Crud.getColunm('customizer_channel', guild.id);

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
                    await Crud.setColunm('customizer_channel', channel.id, guild.id);
                });
            };

            if (logCh != '0') return;

            await guild.channels.create('Info', { type: 'GUILD_TEXT', parent: group }).then(async channel => {
                const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL()!)
                    .setColor('GREEN')
                    .setDescription(`<@${message.author.id}> was start moderation settings`)
                    .setTimestamp(Date.now());
                await Crud.setColunm('log_channel', guild.id, channel.id);
                channel.send({ embeds: [embed] });
            });
        }
    }
}