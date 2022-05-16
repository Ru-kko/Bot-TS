import { AxiosError } from "axios";
import type { NextFunction, Request, Response } from "express";
import type { tokenData } from "../../../../types/DiscordAuth";
import { refreshToken } from "../services/DiscordOauth";

export default async function tokenRefresh(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.session.token) {
        res.status(403);
        return res.send({
            error: "Fornidden",
            status: 403,
            message: "You are not logged in",
        });
    }
    if (
        new Date(req.session.token.create).getTime() +
            req.session.token.expires * 1000 <=
            Date.now()
    ) {    
        const token: tokenData = {
            access_token: req.session.token.token,
            expires_in: req.session.token.expires,
            refresh_token: req.session.token.refresh,
            token_type: req.session.token.type,
        };

        const tokenRes = await refreshToken(token).catch<AxiosError>((e) => e);

        if (tokenRes instanceof Error) {
            res.setHeader("Content-Type", "application/json");
            res.status(tokenRes.response?.status ?? 500);
            return res.send({
                error: tokenRes.message,
                message: tokenRes.response?.data.error_description,
            });
        }

        req.session.token.create = new Date().toString().slice(0, -5);
        req.session.token.refresh = tokenRes.data.refresh_token;
        req.session.token.expires = tokenRes.data.expires_in;
        req.session.token.token = tokenRes.data.access_token;
    }
    next();
}
