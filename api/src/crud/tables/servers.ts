import { RowDataPacket } from "mysql2";
import { connection } from "../connection";


const servers = new class {
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
        }
    }
    async setColunm(channelType: serverColum, serverID: string | number, dt: number | string) {
        const data = channelType == 'prefix' ? `"${dt}"` : dt;
        try {
            const cnt = await connection();
            await cnt.query(`Update servers set ${channelType} = ${data} where sv_id = ${serverID}`);
        } catch (e) {
            console.log(e);
        }
    }
    async getColunm(channelType: serverColum, serverID: string | number): Promise<string> {
        try {
            const cnt = await connection();
            const [response, _] = await cnt.query<RowDataPacket[]>(`Select sv_id ,${channelType} from servers where sv_id = ${serverID}`);
            cnt.end();
            return response[0][channelType]
        } catch (e) {
            throw e;
        }
    }
    async deleteServer(serverID: string | number) {
        try {
            const cnt = await connection();
            await cnt.query(`Delete From servers where sv_id = ${serverID}`);
        } catch (e) {
            console.log(e);
        }
    }
}

type serverColum = 'customizer_channel' | 'log_channel' | 'wlecome_channel' | 'prefix';


export { servers , serverColum};