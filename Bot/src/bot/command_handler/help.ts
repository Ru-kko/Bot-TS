import { ColorResolvable, Message, MessageEmbed } from "discord.js";
import { servers } from "../../crud/tables/servers";
import commandMap, { commandSpesifications } from "../commands";

export default async (message: Message) => {
    let newMsg = '';
    const _break = null;
    let count: number = 0;

    const configCh = await servers.getColunm('customizer_channel', message.guildId!);

    if (message.channelId == configCh) {
        commandMap.forEach((i:commandSpesifications, k:string) => {
            try{
                if(i.admin && (k != "help")){
                    count ++;
                    newMsg += '``' + k + '`` ' + i.description + '\n';
                    if (count >= 10) throw _break;
                }
            }catch(e){
                if (e != _break) throw e;
            }
        })

    } else {
        commandMap.forEach((i: commandSpesifications, k: String) => {
            try {
                if (!i.admin && (k != "help")) {
                    count++;
                    newMsg += '``' + k + ':`` ' + i.description + '\n';
                    if (count >= 10) throw _break;
                }
            } catch (e) {
                if (e != _break) throw e;
            }
        });
    }

    newMsg += '\n[``more``](https://youtu.be/dQw4w9WgXcQ)';

    const embed = new MessageEmbed()
        .setTitle('Commands')
        .setDescription(newMsg)
        .setURL('https://youtu.be/dQw4w9WgXcQ')
        .setColor(<ColorResolvable>'GREEN');

    message.channel.send({ embeds: [embed] });
}