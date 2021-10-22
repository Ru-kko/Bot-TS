import { Message, MessageEmbed } from "discord.js";

export default async (message: Message) => {
    const guild = message.guild;

    if (guild) {
        const member = await guild.members.fetch(message.author.id);

        if (member.permissions.has('MANAGE_CHANNELS' || 'ADMINISTRATOR')) {
            const group = await guild.channels.create('STAF', {
                type: 'GUILD_CATEGORY', permissionOverwrites: [{
                    id: guild.id,
                    allow: ['ADMINISTRATOR', 'MANAGE_CHANNELS']
                }]
            });
            await guild.channels.create('Config', { type: 'GUILD_TEXT', parent: group }).then((channel) =>{
                // TODO
            });
            await guild.channels.create('Info', { type: 'GUILD_NEWS' , parent: group}).then((channel) => {
                const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL()!)
                    .setColor('GREEN')
                    .setDescription(`<@${message.author.id}> was start moderation settings`)
                    .setTimestamp(Date.now());
                channel.send({embeds: [embed]})
            });
        }
    }
}