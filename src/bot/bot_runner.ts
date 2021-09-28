import discordjs, { Guild } from 'discord.js';
import crud from '../crud/crud';
import cmd from './commands';

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
        await crud.putServer(guild?.id).catch(async ()=>{
            await crud.deleteServer(guild?.id);
            crud.putServer(guild?.id);
        });
        const embed = new discordjs.MessageEmbed()
            .setTitle('Hi everyone!!')
            .setURL('https://youtu.be/dQw4w9WgXcQ')
            .setAuthor(client.user?.username!, client.user?.avatarURL() || 'https://cdn.discordapp.com/app-icons/879945146869899294/82f01e5d30f012279d2a3c4430b0a27b.png?size=256')
            .setColor('GREEN')
            .setDescription('**English**\n\n Hello everyone again, thanks for inviting me to this server, ' +
                'You can use the `waifu help` command to see the list of commands and the `waifu init`' +
                'command if you are an administrator to install the moderation settings.\n\n' +
                '**Español**\n\n Hola a todos de nuevo, gracias por invitarme a este server, Puedes usar ' +
                'el comando `waifu comandos` para ver toda la lista de comandos y el comando `waifu init`' +
                'si ere administrador para configurar el mode de moderacion del bot');

        guild?.systemChannel?.send({ embeds: [embed] });
    });
    client.on("message", async message => {
        if(message.author.bot) return;


        var prefix:String = "waifu";
        const content = message.content.split(" ");

        if(message.guild){
            const find = await crud.getServerPrefix(message.guild.id)
            prefix = find;
            crud.addXP(message.guild.id, message.author.id, Math.round(Math.random() * (10 - 5)) + 5)
        }
        if(content[0] == prefix){
            /*if(cmd.has(content[1])){
                cmd.get(content[1])(message);
            }*/
        };
    });
    client.login(process.env.discord_token);
};

export { client };