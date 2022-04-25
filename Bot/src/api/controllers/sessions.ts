import { Request, Response } from "express";
import { AxiosError } from "axios";
import { getAccessToken, identifyUser } from "../services/DiscordOauth";

export async function registre(req: Request, res: Response) {
    const code = <string | undefined>req.query.code;

    if (!code) {
        res.status(400);
        res.send({
            error: "Request failed with status code 400",
            message: "Invalid code",
        });
        return;
    }

    const data = await getAccessToken(String(code)).catch<AxiosError>((e) => e);

    if (data instanceof Error) {
        res.setHeader("Content-Type", "application/json");
        res.status(data.response?.status ?? 500);
        res.send({
            error: data.message,
            message: data.response?.data.error_description,
        });
        return;
    }
    const user = await identifyUser(data.data.access_token);

    const token = {
        refresh: data.data.refresh_token,
        type: data.data.refresh_token,
        token: data.data.access_token,
        create: new Date().toISOString().slice(0, -5),
        expires: data.data.expires_in,
    };

    req.session.userid = user.data.user.id;
    req.session.code = code;
    req.session.token = token;

    req.session.save((e) => {
        if (e) {
            res.status(500);
            res.send({ Error: e.name, message: e.message });
        } else {
            res.status(200);
            res.send();
        }
    });
}

export function logOut(req: Request, res: Response) {
    if (!req.session) {
        res.status(404);
        res.send({error: 'Not loged', message: 'you must login before doing this'})
    }
    req.session.destroy((e: Error) => {
        if (e) {
            res.status(500);
            res.send({ message: e.message });
        } else {
            res.status(205).send();
        }
    });
}
