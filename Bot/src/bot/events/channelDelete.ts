import { Channel, MessageEmbed, TextBasedChannel } from "discord.js";
import { ChannelTypes } from "discord.js/typings/enums";
import { servers } from "../../crud/tables/servers";
import { client } from "../bot_runner";

export default async (channel: Channel) => {
    const ch_json = <channelJSON>channel.toJSON();

    const isLogCh = await servers.getColunm('log_channel', ch_json.guildId);
    const isConfi = await servers.getColunm('customizer_channel', ch_json.guildId);
    const isWelcome = await servers.getColunm('wlecome_channel', ch_json.guildId);

    const author = await client.guilds.resolve(ch_json.guildId)!.fetchAuditLogs({ type: 'CHANNEL_DELETE' })
        .then(logs => { 
            return logs.entries.find(entry => (<Channel>entry.target).id == ch_json.id)!.executor;
        });

    if (isLogCh == ch_json.id) {
        await servers.setColunm('log_channel', ch_json.guildId, 0);
    } else {
        if (isConfi == ch_json.id) {
            await servers.setColunm('log_channel', ch_json.guildId, 0);
        }else if (isWelcome == ch_json.id) {
            await servers.setColunm('wlecome_channel', ch_json.guildId, 0)
        }

        if (isLogCh != '0') {
            const embed = new MessageEmbed()
                .setAuthor(author?.username!, author?.avatarURL()!)
                .setDescription(`<@${author?.id}> was deleted channel **${ch_json.name}**`)
                .setColor('GREEN')
                .setTimestamp(Date.now());
            const _channel = <TextBasedChannel>client.channels.cache.find(ch => ch.id == isLogCh)!;
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