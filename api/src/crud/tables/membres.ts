import { RowDataPacket } from "mysql2";
import { connection } from "../connection"
import users from "./users";

const members = new class {
    async newMember(userID: number | string, serverID: string | number,): Promise<void> {
        try {
            const cnt = await connection();
            await cnt.query(`INSERT INTO usrs_srvs(usr_id, sv_id) Values(${userID}, ${serverID})`)
                .catch(async e => {
                    if (e.code == 'ER_NO_REFERENCED_ROW_2') {
                        await users.putUser(userID);
                        this.newMember(serverID, userID);
                    }
                });
        } catch {/** NOTING */ }
    }
    /**
     * @param serverID 
     * @param userID 
     * @param xp 
     * @returns **NUMBER**
     * -0 whether the user conitinue in the same level
     * -1 whether the user will level up
     * -2 whether the query has an error
     */
    async addXp(serverID: string | number, userID: string | number, xp: number): Promise<[number, string]> {
        var res: [number, string];
        try {
            const where = `WHERE usr_id = ${userID} AND sv_id = ${serverID}`;

            const cnt = await connection();
            const [response, _] = await cnt.query<RowDataPacket[]>(`SELECT sv_t_xp,act_level FROM usrs_srvs ${where}`);

            if (response[0] == undefined) { cnt.end(); throw new userNoExist(serverID, userID) };

            var [total_xp, level] = [response[0]['sv_t_xp'], response[0]['act_level']];


            // method
            const nextlevel: number = (10 * (level * level)) + Math.pow(10 * (level + 1), 2);

            total_xp += xp;

            if (nextlevel > total_xp) {
                await cnt.query(`Update usrs_srvs set sv_t_xp = ${total_xp} ${where}`);
                res = [0, 'Continue on same level'];
            } else {
                level += 1;
                await cnt.query(`Update usrs_srvs set sv_t_xp = ${total_xp}, act_level = ${level} ${where}`)
                res = [1, 'level up'];
            };

            cnt.end();
        } catch (e: userNoExist | any) {
            if (e.type) {
                this.newMember(serverID, userID);
            }
            res = [2, 'New member'];
        };
        return res;
    }
}

class userNoExist {
    serverID: Number | string;
    userID: Number | string;
    public type = "error";

    constructor(server: Number | string, user: Number | string) {
        this.serverID = server;
        this.userID = user;
    }
}

export default members;