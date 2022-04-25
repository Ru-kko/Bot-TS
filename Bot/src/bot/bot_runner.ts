import discordjs, { Guild } from 'discord.js';
import Members from '../crud/tables/membres';
import { Servers } from '../crud/tables/servers';
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
		const serverManager = new Servers();
        await serverManager.putServer(guild?.id).catch(async () => {
            await serverManager.deleteServer(guild?.id);
            await serverManager.putServer(guild?.id);
			serverManager.close();
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
		const serverManager = new Servers();
		const memberManager = new Members(serverManager);
		const server = await serverManager.getServer(message.guild!.id, true);


        const content = message.content.split(" ");

        if (message.guild) {
            await memberManager.addXP(message.guild.id, message.author.id, Math.round(Math.random() * (10 - 5)) + 5);
        }
        if (content[0] === server.prefix) {
            const func = cmd.get(content[1]);
            if (func) func.method(message);
        };
		memberManager.close();
    });
    client.on('channelDelete', channelDelete);
    client.login(process.env.discord_token);
};

export { client };
