import { NextFunction, Request, Response } from "express";

export default function getCookieSid(req: Request, _: Response, next: NextFunction ): void {
    let cookie = req.headers.cookie?.slice(16, 48)
    req.sid = cookie;
    next();
};