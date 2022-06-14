import axios, { type AxiosResponse } from "axios";
import type { UserGuild, user, fullGuild, member } from "../../../../types/DiscordAuth";
import type { tokenData, identify_request } from "../../../../types/DiscordAuth";

export async function getAccessToken(code: string) {
    const data =
        "grant_type=authorization_code&" +
        "client_id=" +
        process.env.discord_client_id +
        "&client_secret=" +
        process.env.discord_client_sec +
        "&redirect_uri=" +
        process.env.discord_redirect +
        "&scope=identify,guilds&" +
        "code=" +
        code;

    const res: AxiosResponse<tokenData> = await axios(process.env.discord_api_endpoint + "/v8/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data.toString(),
    });

    return res;
}

export async function identifyUser(token: string): Promise<AxiosResponse<identify_request>> {
    const res = await axios.request<identify_request>({
        url: process.env.discord_api_endpoint + "/v8/oauth2/@me",
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    return res;
}

export async function refreshToken(token: tokenData) {
    const data =
        "grant_type=refresh_token&" +
        "client_id=" +
        process.env.discord_client_id +
        "&client_secret=" +
        process.env.discord_client_sec +
        "&refresh_token=" +
        token.refresh_token;

    const res = await axios.post<tokenData>(process.env.discord_api_endpoint + "/v8/oauth2/@me/token", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data,
    });

    return res;
}
export async function getAllUserInfo(token: tokenData) {
    return await axios.get<user>(process.env.discord_api_endpoint + "/users/@me", {
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        },
    });
}

export async function getServers(token: string) {
    return await axios.get<UserGuild[]>(process.env.discord_api_endpoint + "/users/@me/guilds", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function getAServer(serverid: string) {
    return await axios.get<fullGuild>(process.env.discord_api_endpoint + "/guilds/" + serverid, {
        headers: {
            Authorization: `Bot ${process.env.discord_token}`,
        },
    });
}

export async function getGuildMember(token: string, guildId: string) {
    return await axios.get<member>(
        process.env.discord_api_endpoint + "/users/@me/guilds/" + guildId + "/member",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}
