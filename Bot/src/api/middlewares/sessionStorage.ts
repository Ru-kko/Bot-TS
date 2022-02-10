import { SessionData, Store } from "express-session";
import Database from "../../crud/tables/sessions";

export default class SessionStorage extends Store {

    get(sid: string, callback: (err: any, session?: SessionData | null) => void): void {
        const DB = new Database();
        DB.has(sid).then(res => {
            if (res) {
                DB.get(sid)
                    .then(data => callback(null, data))
                    .catch(e => callback(null, e))
                    .finally(() => DB.close());
            } else {
                callback(null, null);
            };
        });
    }

    set(sid: string, session: SessionData, callback?: (err?: any) => void): void {
        const DB = new Database();
        if (session.code) {
            DB.has(sid).then(res => {
                if (res) {
                    DB.touch(sid, session)
                        .catch(e => callback ? callback(e) : NaN)
                        .finally(() => DB.close());
                } else {
                    DB.set(sid, session)
                        .catch(e => callback ? callback(e) : NaN)
                        .finally(() => DB.close());
                }
            })
        }

        callback ? callback() : NaN;
    }

    touch(sid: string, session: SessionData, callback?: () => void): void {
        const DB = new Database();

        DB.touch(sid, session).then(() => {
            DB.close();
            callback ? callback() : NaN;
        });
    }

    destroy(sid: string, callback?: (err?: any) => void): void {
        const DB = new Database();
        DB.delete(sid)
            .then(() => DB.close())
            .catch(e => callback ? callback(e) : NaN)
    }
}