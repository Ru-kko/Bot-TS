import axios, { AxiosResponse } from "axios";
import { tokenData, identify_request } from "../../../../types/DiscordAuth"

export async function getAccessToken(code: string) {
    const data = 'grant_type=authorization_code&' +
        'client_id=' + process.env.discord_client_id + '&' +
        'client_secret=' + process.env.discord_client_sec + '&' +
        'redirect_uri=' + process.env.discord_redirect + '&' +
        'scope=identify&' +
        'code=' + code;

    const res: AxiosResponse<tokenData> = await axios(process.env.discord_api_endpoint + '/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data.toString()
    });

    return res;
}

export async function identifyUser(token: string):Promise<AxiosResponse<identify_request>> {
    const res = await axios.request<identify_request>({
        url: process.env.discord_api_endpoint + '/@me',
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + token
        }
    })

    return res;
}