import axios, { AxiosError } from "axios";
import { apiError, guildsResponse, guildWithOptions, optionsBase } from "@bot/types";
import { PUBLIC } from "@bot/config";

export async function getAllServers() {
  return (await axios.get<guildsResponse>(PUBLIC.SERVER_URL + "/servers", { withCredentials: true })).data;
}

export async function getServerConfig(serverID: string) {
  return await axios
    .get<guildWithOptions>(PUBLIC.SERVER_URL + "/servers" + "/" + serverID, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export async function updateInfo(serverID: string, info: optionsBase) {
  return await axios
    .put(PUBLIC.SERVER_URL + "/servers" + "/" + serverID, info, { withCredentials: true })
    .catch((err: AxiosError<apiError<optionsBase>>) => {
      return err.response?.data;
    });
}
