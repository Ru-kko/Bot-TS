import type { AxiosError } from "axios";
import type { Request, Response } from "express";
import type { tokenData } from "../../../../types/DiscordAuth";
import { getAllUserInfo } from "../services/DiscordOauth";

export async function getUser(req: Request, res: Response) {
    try {
        const token: tokenData = {
            token_type: req.session.token!.type,
            access_token: req.session.token!.token,
            refresh_token: req.session.token!.refresh,
            expires_in: req.session.token!.expires,
        };
    
        const response = await getAllUserInfo(token).catch<AxiosError>((e) => e);
    
        if (response instanceof Error) {
            res.status(response.response?.status ?? 500);
            return res.send({
                error: response.message,
                message: response.response?.data.error_description,
            });
        }
    
        res.status(200);
        return res.send(response.data);
    } catch (error) {
        console.log('error', error);
    }
}
