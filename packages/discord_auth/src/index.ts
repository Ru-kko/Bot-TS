import axios, { AxiosError } from "axios";
import { PUBLIC } from "@bot/config/dist/configuration";
import { fullGuild, identify_request, member, tokenData, user, UserGuild } from "@bot/types";

const discord_api_endpoint = "https://discord.com/api/v10";
export type { AxiosError }

export async function getAccessToken(code: string) {
  const data =
    "grant_type=authorization_code&" +
    "client_id=" +
    PUBLIC.DC_CLIENT_ID +
    "&client_secret=" +
    process.env.DC_SECRET +
    "&redirect_uri=" +
    PUBLIC.CLIENT_URL +
    PUBLIC.REDIRECT_ENDPOINT +
    "&scope=identify,guilds&" +
    "code=" +
    code;

  const res = await axios.request<tokenData>({
    url: discord_api_endpoint + "/oauth2/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  });

  return res;
}

export async function identifyUser(token: string) {
  const res = axios.request<identify_request>({
    url: discord_api_endpoint + "/oauth2/@me",
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
    PUBLIC.DC_CLIENT_ID +
    "&client_secret=" +
    process.env.DC_SECRET +
    "&refresh_token=" +
    token.refresh_token;

  const res = await axios.request<tokenData>({
    url: discord_api_endpoint + "/oauth2/@me/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  });
  return res;
}

export async function getAllUserInfo(token: tokenData) {
  return await axios.get<user>(discord_api_endpoint + "/users/@me", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
}

export async function getServers(token: string) {
  return await axios.get<UserGuild[]>(discord_api_endpoint + "/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getAServer(serverid: string) {
  return await axios.get<fullGuild>(discord_api_endpoint + "/guilds/" + serverid, {
    headers: {
      Authorization: `Bot ${process.env.discord_token}`,
    },
  });
}

export async function getGuildMember(token: string, guildId: string) {
  return await axios.get<member>(discord_api_endpoint + "/users/@me/guilds/" + guildId + "/member", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
