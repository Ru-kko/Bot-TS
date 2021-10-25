import { Channel, MessageEmbed, TextBasedChannels } from "discord.js";
import { ChannelTypes } from "discord.js/typings/enums";
import Crud from "../../crud/crud";
import { client } from "../bot_runner";

export default async (channel: Channel) => {
    const ch_json = <channelJSON>channel.toJSON();

    const isLogCh = await Crud.getColunm('log_channel', ch_json.guildId);
    const isConfi = await Crud.getColunm('customizer_channel', ch_json.guildId);
    const isWelcome = await Crud.getColunm('wlecome_channel', ch_json.guildId);

    const author = await client.guilds.resolve(ch_json.guildId)!.fetchAuditLogs({ type: 'CHANNEL_DELETE' })
        .then(logs => { 
            return logs.entries.find(entry => (<Channel>entry.target).id == ch_json.id)!.executor;
        });

    if (isLogCh == ch_json.id) {
        await Crud.setColunm('log_channel', ch_json.guildId, 0);
    } else {
        if (isConfi == ch_json.id) {
            await Crud.setColunm('log_channel', ch_json.guildId, 0);
        }else if (isWelcome == ch_json.id) {
            await Crud.setColunm('wlecome_channel', ch_json.guildId, 0)
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

interface targetChannel {
    id: string;
    name: string;
}

interface channelJSON {
    type: ChannelTypes;
    guildId: string;
    id: string;
    name: string;
}