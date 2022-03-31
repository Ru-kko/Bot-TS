import { SessionData } from "express-session";

declare module "express-session" {
    interface SessionData {
        userid: string;
        code: string;
        token: {
            type: string;
            refresh: string;
            expires: number;
            token: string;
			create: string;
        }
    }
}
