import discordjs, { Guild } from 'discord.js';
import members from '../crud/tables/membres';
import { servers } from '../crud/tables/servers';
import cmd from './commands';
import channelDelete from './events/channelDelete';

const client = new discordjs.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "DIRECT_MESSAGES"
    ]
});

export default () => {
    client.on('ready', () => {
        console.log(`Bot ready`);
    });
    client.on('guildCreate', async guild => {
        await servers.putServer(guild?.id).catch(async () => {
            await servers.deleteServer(guild?.id);
            servers.putServer(guild?.id);
        });
        const embed = new discordjs.MessageEmbed()
            .setTitle('Hi everyone!!')
            .setURL('https://youtu.be/dQw4w9WgXcQ')
            .setAuthor(client.user?.username!, client.user?.avatarURL() || 'https://cdn.discordapp.com/app-icons/879945146869899294/82f01e5d30f012279d2a3c4430b0a27b.png?size=256')
            .setColor('GREEN')
            .setDescription('\n\n Hello everyone again, thanks for inviting me to this server, ' +
                'You can use the `waifu help` command to see the list of commands and the `waifu init`' +
                'command if you are an administrator to install the moderation settings.');

        guild?.systemChannel?.send({ embeds: [embed] });
    });
    client.on("message", async message => {
        if (message.author.bot) return;


        var prefix: String = await servers.getColunm('prefix', message.guild!.id) || "waifu";
        const content = message.content.split(" ");

        if (message.guild) {
            members.addXp(message.guild.id, message.author.id, Math.round(Math.random() * (10 - 5)) + 5);
        }
        if (content[0] == prefix) {
            const func = cmd.get(content[1]);
            if (func) func.method(message);
        };
    });
    client.on('channelDelete', channelDelete);
    client.login(process.env.discord_token);
};

export { client };