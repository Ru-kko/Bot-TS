import axios from "axios";
import config from "../Config/values.config";
import { user } from "../../../types/DiscordAuth"

export async function userInfo() {
    return await axios.get<user>(config.Server.url + config.Server.endPoits.user , {
        withCredentials: true
    }).then(res => res.data);
}