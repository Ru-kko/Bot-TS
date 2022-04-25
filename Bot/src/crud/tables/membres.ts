import { QueryError, RowDataPacket } from "mysql2";
import { Member } from "../../../../types/crud";
import { connection } from "../connection";
import { Users } from "./users";

class Members extends connection {
    public async memberJoin(
        UserID: number | string,
        ServerID: number | string
    ): Promise<void> {
        try {
            await this.cnt.query(
                "INSERT INTO usrs_srvs(usr_id, sv_id) VALUES" +
                    `(${UserID}, ${ServerID})`
            );
        } catch (e: QueryError | any) {
            switch (e.errno){
                case 1026: break;
                case 1452:
                    const userManager = new Users();
                    await userManager.putUser(UserID);
                    break;
                default:
                    console.log(e);
            }

        }
    }

    public async addXP(
        UserID: number | string,
        ServerID: string | number,
        XP: number
    ): Promise<boolean> {
        const condition = `WHERE usr_id = ${UserID} AND sv_id = ${ServerID}`;
        const member = await this.cnt
            .query<memberResponse[]>(
                `SELECT sv_t_xp, act_level FROM usrs_srvs ` + condition
            )
            .then(async ([data, _]) => {
                if (!data[0]) {
                    await this.memberJoin(UserID, ServerID);
                    return { sv_t_xp: 0, act_level: 0 };
                }
                return data[0];
            });
        const nextlevel =
            10 * Math.pow(member.act_level!, 2) +
            Math.pow(10 * (member.act_level! + 1), 2);
        member.sv_t_xp! += XP;
        if (nextlevel > member.sv_t_xp!) {
            await this.cnt.query(
                `UPDATE usrs_srvs SET sv_t_xp = ${member.sv_t_xp} ${condition}`
            );
            return false;
        } else {
            await this.cnt.query(
                "UPDATE usrs_srvs SET " +
                    `sv_t_xp = ${member.sv_t_xp!} act_level = ${member.act_level!} ` +
                    condition
            );
            return true;
        }
    }

	public async getMember(UserID: number | string, ServerID: number | string, create?: boolean): Promise<Member>{
		const [res, _] = await	this.cnt.query<memberResponse[]>(`SELECT * from usrs_srvs WHERE usr_id = ${UserID} AND sv_id = ${ServerID}`);

		if (!res[0] && create){
			await this.memberJoin(UserID, ServerID);
			return await this.getMember(UserID, ServerID);
		}
		return res[0];
	}
}

interface memberResponse extends RowDataPacket, Member {}
export default Members;
