import axios from "axios";
import { guildsResponse } from "../../../types/apiResponse";
import Config from "../Config/values.config";

export async function getAllServers() {
    return (
        await axios.get<guildsResponse>(
            Config.Server.url + Config.Server.endPoits.servers,
            { withCredentials: true }
        )
    ).data;
}
