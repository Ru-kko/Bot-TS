import axios, { AxiosError } from "axios";
import { fullGuild, identify_request, member, tokenData, user, UserGuild } from "@bot/types";
import "@bot/config/dist/configuration";

export type { AxiosError };

export async function getAccessToken(code: string) {
  const microservice = process.env.SERVICES_REQUESTS_URI + "/dc/";
  const res = await axios.request<tokenData>({
    method: "POST",
    url: microservice + "token?code=" + code,
  });
  return res;
}

export async function identifyUser(token: string) {
  const microservice = process.env.SERVICES_REQUESTS_URI + "/dc/";
  const res = axios.request<identify_request>({
    url: microservice + "user/identify",
    method: "GET",
    headers: {
      access: token,
    },
  });

  return res;
}

export async function refreshToken(token: tokenData) {
  const microservice = process.env.SERVICES_REQUESTS_URI + "/dc/";
  const res = await axios.request<tokenData>({
    method: "POST",
    url: microservice + "token/update?refresh=" + token.refresh_token,
  });
  return res;
}

export async function getAllUserInfo(token: tokenData) {
  const microservice = process.env.SERVICES_REQUESTS_URI + "/dc/";
  return await axios.request<user>({
    url: microservice + "user",
    method: "GET",
    headers: {
      access: token.access_token,
    },
  });
}

export async function getServers(token: string) {
  const microservice = process.env.SERVICES_REQUESTS_URI + "/dc/";
  return await axios.get<UserGuild[]>(microservice + "user/guilds", {
    headers: {
      access: token,
    },
  });
}

export async function getAServer(serverid: string) {
  const microservice = process.env.SERVICES_REQUESTS_URI + "/dc/";
  return await axios.get<fullGuild>(microservice + "guild?guild=" + serverid, {});
}

export async function getGuildMember(token: string, guildId: string) {
  const microservice = process.env.SERVICES_REQUESTS_URI + "/dc";
  return await axios.get<member>(microservice + "/user/member", {
    headers: {
      access: token,
      guildId: guildId,
    },
  });
}
