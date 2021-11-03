import axios from "axios";
import { Channel, MessageEmbed, TextBasedChannels } from "discord.js";
import { ChannelTypes } from "discord.js/typings/enums";
import { client } from "..";
import { restContent } from "../command_handler/Interfaces/interfaces";

export default async (channel: Channel) => {
    const ch_json = <channelJSON>channel.toJSON();

    const isLogCh = await axios.get(process.env.BackPaht! + `/server/${ch_json.guildId}/colunm/log_channel`).then(inf =>{return (<restContent>inf.data).colunm!});
    const isConfi = await axios.get(process.env.BackPaht! + `/server/${ch_json.guildId}/colunm/customizer_channel`).then(inf =>{return (<restContent>inf.data).colunm!});
    const isWelcome = await axios.get(process.env.BackPaht! + `/server/${ch_json.guildId}/colunm/wlecome_channel`).then(inf =>{return (<restContent>inf.data).colunm!});

    const author = await client.guilds.resolve(ch_json.guildId)!.fetchAuditLogs({ type: 'CHANNEL_DELETE' })
        .then(logs => { 
            return logs.entries.find(entry => (<Channel>entry.target).id == ch_json.id)!.executor;
        });

    if (isLogCh == ch_json.id) {
        await axios.delete(process.env.BackPaht! + `/server/${ch_json.guildId}/colunm/log_channel`)
    } else {
        if (isConfi == ch_json.id) {
            await axios.delete(process.env.BackPaht! + `/server/${ch_json.guildId}/colunm/customizer_channel`)
        }else if (isWelcome == ch_json.id) {
            await axios.delete(process.env.BackPaht! + `/server/${ch_json.guildId}/colunm/wlecome_channel`)
        }

        if (isLogCh != '0') {
            const embed = new MessageEmbed()
                .setAuthor(author?.username!, author?.avatarURL()!)
                .setDescription(`<@${author?.id}> was deleted channel **${ch_json.name}**`)
                .setColor('GREEN')
                .setTimestamp(Date.now());
            const _channel = <TextBasedChannels>client.channels.cache.find(ch => ch.id == isLogCh)!;
            _channel?.send({embeds: [embed]});
        }
    }
};

interface channelJSON {
    type: ChannelTypes;
    guildId: string;
    id: string;
    name: string;
}