import { Channel, MessageEmbed, TextBasedChannel } from "discord.js";
import { ChannelTypes } from "discord.js/typings/enums";
import { Servers } from "../../crud/tables/servers";
import { client } from "../bot_runner";

export default async (channel: Channel) => {
    const ch_json = <channelJSON>channel.toJSON();

    const serverManager = new Servers();
    const server = await serverManager.getServer(ch_json.id, true);

    const author = await client.guilds
        .resolve(ch_json.guildId)!
        .fetchAuditLogs({ type: "CHANNEL_DELETE" })
        .then((logs) => {
            return logs.entries.find(
                (entry) => (<Channel>entry.target).id == ch_json.id
            )!.executor;
        });
    switch (parseInt(ch_json.id)) {
        case server.log_channel:
            await serverManager.setColunm(["log_channel", 0], ch_json.guildId);
            return;
        case server.wlecome_channel:
            await serverManager.setColunm(
                ["wlecome_channel", 0],
                ch_json.guildId
            );
            break;
        case server.customizer_channel:
            await serverManager.setColunm(["log_channel", 0], ch_json.guildId);
            break;
    }
    if (server.log_channel !== 0) {
        const embed = new MessageEmbed()
            .setAuthor(author?.username!, author?.avatarURL()!)
            .setDescription(
                `<@${author?.id}> was deleted channel **${ch_json.name}**`
            )
            .setColor("GREEN")
            .setTimestamp(Date.now());
			const _channel = <TextBasedChannel>(
				client.channels.cache.find((ch) => ch.id === String(server.log_channel))!
        );
        _channel?.send({ embeds: [embed] });
    }
	
	serverManager.close();
};

interface channelJSON {
    type: ChannelTypes;
    guildId: string;
    id: string;
    name: string;
}
