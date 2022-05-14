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
        req.session.token &&
        new Date(req.session.token.create).getSeconds() +
            req.session.token.expires <=
            Date.now()
    ) {    
        const token: tokenData = {
            access_token: req.session.token.token,
            expires_in: req.session.token.expires,
            refresh_token: req.session.token.refresh,
            token_type: req.session.token.type,
        };

        const res = await refreshToken(token);

        req.session.token.create = new Date().toString().slice(0, -5);
        req.session.token.refresh = res.data.refresh_token;
        req.session.token.expires = res.data.expires_in;
        req.session.token.token = res.data.access_token;
    }
    next();
}
