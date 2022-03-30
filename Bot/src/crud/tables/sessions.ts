import type { SessionData } from "express-session";
import type { RowDataPacket } from "mysql2";
import { connection } from "../connection";
import type { session } from "../../../../types/crud.d";

class SessionsDataBase extends connection {
    async has(sid: String): Promise<Boolean> {
        const [data, _] = await super.cnt.query<RowDataPacket[]>(
            `SELECT COUNT(1) as exist FROM sessions_storage WHERE ssid = '${sid}'`
        );

        return !(!data[0]["exist"]);
    }

    async get(sid: string): Promise<SessionData | undefined> {
        const [data, _] = await super.cnt.query<SessionResponse[]>(
            `SELECT * FROM sessions_storage WHERE ssid = '${sid}'`
        );
        const info = data[0];
        if (!info) return;
        var response: SessionData = {
            cookie: {
                originalMaxAge: info.originalMaxAge!,
                expires: new Date(info.deleteDate),
            },
            code: info.code,
            userid: String(info.userid),
            token: {
                type: info.tokenType!,
                refresh: info.refreshToken,
                expires: info.tokenExpires,
                create: info.tokenCreated,
                token: info.token,
            },
        };

        return response;
    }

    async set(sid: string, session: SessionData): Promise<void> {
        await super.cnt.query(
            "INSERT INTO sessions_storage" +
                "(ssid, code, originalMaxAge, refreshToken, deleteDate, token, tokenType, tokenCreated, tokenExpires, userid" +
                "VALUES(" +
                `'${sid}', '${session.code}', ${session.cookie.originalMaxAge}, '${session.token.refresh}',` +
                `'${new Date(session.cookie.expires!).toISOString()}', '${
                    session.token.token
                }', '${session.token.type}',` +
                `'${session.token.create}', ${session.token.expires}, ${session.userid}`
        );
    }

    async delete(sid: string): Promise<void> {
        await super.cnt.query(
            `DELETE FROM sessions_storage WHERE ssid = '${sid}'`
        );
    }

    async touch(sid: string, session: SessionData) {
        let data: string[] = [];

        const formatt: session = {
            code: session.code,
            refreshToken: session.token.refresh,
            deleteDate: session.cookie.expires!,
            token: session.token.token,
            tokenExpires: session.token.expires,
            tokenCreated: session.token.create,
        };
		Object.entries(formatt).forEach(([key, val])=> {
			if (!val) return;
			
			if (val instanceof Date) {
				data.push(`${key}, '${val.toISOString()}'`)
			} else if (key === "tokenExpires") {
				data.push(`${key} = ${Date.now + val}`)
			} else if (val instanceof String) {
				data.push(`${key} = '${val}'`)	
			}
    	});
		
		await super.cnt.query(`UPDATE sessions_storage SET ${data.join()} WHERE ssid = '${sid}'`);
	}
}

interface SessionResponse extends RowDataPacket, session {}

export { SessionsDataBase };
