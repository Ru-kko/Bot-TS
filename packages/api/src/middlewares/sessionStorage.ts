import { SessionData, Store } from "express-session";
import { SessionsDB as Database } from "@bot/db";

export default class SessionStorage extends Store {
    get(
        sid: string,
        callback: (err: any, session?: SessionData | null) => void
    ): void {
        const DB = new Database();
        try {
            DB.has(sid).then((res) => {
                if (res) {
                    DB.get(sid)
                        .then((data) => callback(null, data))
                        .finally(() => DB.close());
                } else {
                    callback(null, null);
                }
            });
        } catch (e) {
            callback(e, null);
            DB.close();
        }
    }

    set(
        sid: string,
        session: SessionData,
        callback?: (err?: any) => void
    ): void {
        const DB = new Database();
        if (session.code) {
            try {
                DB.has(sid).then((res) => {
                    if (res) {
                        DB.touch(sid, session).then(() => {
                            callback?.();
                            DB.close();
                        });
                    } else {
                        DB.set(sid, session).then(() => {
                            callback?.();
                            DB.close();
                        });
                    }
                });
            } catch (e) {
                callback?.(e);
            }
        }

        callback?.();
    }

    touch(sid: string, session: SessionData, callback?: () => void): void {
        const DB = new Database();

        DB.touch(sid, session).then(() => {
            DB.close();
            callback?.();
        });
    }

    destroy(sid: string, callback?: (err?: any) => void): void {
        const DB = new Database();
        DB.delete(sid)
            .then(() => callback?.())
            .catch((e) => callback?.(e))
            .finally(() => DB.close());
    }
}
