import { RowDataPacket } from 'mysql2';
import connection from './connection';

const Crud = new class {
    async putUser(userID: number | String): Promise<void> {
        try {
            const cnt = await connection();
            await cnt.query(`INSERT INTO users(usr_id) Values(${userID})`);
            cnt.end();
        } catch (e) {
            console.log(e);
        };
        return;
    };
    async putServer(serverID: number | String) {
        try {
            const cnt = await connection();
            await cnt.query(`INSERT INTO servers(sv_id) Values(${serverID})`);
            cnt.end();
        } catch (e) {
            if ((e as Error).message == `Duplicate entry '${serverID}' for key 'servers.PRIMARY'`) {
                throw new Error('This server already exits');
            } else {
                console.log(e);
            }
        };
    };
    async userJoin(serverID: string | number, userID: string | number) {
        try {
            const cnt = await connection();
            await cnt.query(`INSERT INTO usrs_srvs(usr_id, sv_id) Values(${userID}, ${serverID})`).catch(async (e) => {
                if (e.code == 'ER_NO_REFERENCED_ROW_2'){
                    await this.putUser(userID);
                    this.userJoin(serverID, userID);
                }
            });
            cnt.end();
        } catch (e) {
            console.log(e);
        };
    };
    /**
     * @param serverID 
     * @param userID 
     * @param xp 
     * @returns **NUMBER**
     * -0 whether the user conitinue in the same level
     * -1 whether the user will level up
     * -2 whether the query has an error
     */
    async addXP(serverID: string | number, userID: string | number, xp: number): Promise<number> {
        var res: number;
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
                level += 1;
                await cnt.query(`Update usrs_srvs set sv_t_xp = ${xp} ${where}`);
                res = 0;
            } else {
                await cnt.query(`Update usrs_srvs set sv_t_xp = ${xp}, act_level = ${level} ${where}`)
                res = 1;
            };

            cnt.end();
        } catch (e: userNoExist | any) {
            if(e.type){
                this.userJoin(serverID, userID)
            }
            res = 2;
        };
        return res;
    };
    async getServerPrefix(serverID: string | number): Promise<String> {
        try {
            const cnt = await connection();
            const [response, _] = await cnt.query<RowDataPacket[]>(`Select prefix FROM servers WHERE sv_id = ${serverID}`);
            cnt.end();
            return response[0]['prefix'];
        } catch (e) {
            console.log(e);
            return "error" + e;
        }
    };
    async setServerPrefix(serverID: string | number, newPrefix: String) {
        try {
            const cnt = await connection();
            await cnt.query(`Update servers set prefix = '${newPrefix}' WHERE sv_id = ${serverID}`);
            cnt.end();
        } catch (e) {
            console.log(e);
        }
    };
    async deleteServer(serverID: string | number) {
        try {
            const cnt = await connection();
            await cnt.query(`Delete From servers where sv_id = ${serverID}`)
        } catch (e) {
            console.log(e);
        }
    };
};

class userNoExist  {
    serverID: Number | string;
    userID: Number | string;
    public type = "error";

    constructor(server: Number | string, user: Number | string){
        this.serverID = server;
        this.userID = user;
    }
}

export default Crud;