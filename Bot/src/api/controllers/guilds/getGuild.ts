import { AxiosError } from "axios";
import { Request, Response } from "express";
import { guildWithOptions } from "../../../../../types/apiResponse";
import { Servers } from "../../../crud/tables/servers";
import { getAServer, getGuildMember } from "../../services/DiscordOauth";
import { requestError } from "../../services/Errors";

export async function getServer(req: Request, res: Response) {
    const serverID = req.params.id;
    const serverManager = new Servers();

    const server = await serverManager.getServer(serverID);

    if (!server) {
        return res.status(404).send(
            requestError({
                status: 404,
                data: {
                    type: "guild",
                    value: serverID,
                },
            })
        );
    }
    const [guild, user] = await Promise.all([
        getAServer(serverID)
            .then((inf) => inf.data)
            .catch<AxiosError>((e) => e),
        getGuildMember(req.session.token!.token, serverID)
            .then((inf) => inf.data)
            .catch<AxiosError>((e) => e),
    ]);

    if (guild instanceof Error) {
        res.status(guild.response?.status ?? 500);
        return res.send({
            error: guild.message,
            message: guild.response?.data.error_description,
        });
    }
    if (user instanceof Error) {
        res.status(user.response?.status ?? 500);
        return res.send({
            error: user.message,
            message: user.response?.data.error_description,
        });
    }

    if (guild.owner_id !== user.user.id) {
        const admin = guild.roles.find((val) => (val.permissions & 8) === 8 && user.roles.indexOf(val.id) >= 0);
        if (!admin) {
            return res.status(403).send(
                requestError({
                    status: 403,
                    data: {
                        value: user.user.id,
                    },
                })
            );
        }
    }

    const response: guildWithOptions = {
        id: guild.id,
        name: guild.name,
        user: user.user,
        roles: guild.roles,
        prefix: server.prefix,
        public_leader: Boolean(server.public_leader),
        icon: guild.icon,
    };
    res.status(200);
    res.send(response);

    serverManager.close();
}