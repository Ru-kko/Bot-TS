import { connection } from "../connection";
import type { User } from "@bot/types";
import { RowDataPacket } from "mysql2";

class Users extends connection {
  async putUser(userID: String): Promise<void> {
    try {
      await this.cnt.query(`INSERT INTO users(usr_id) Values("${userID}")`);
    } catch (e: Error | any) {
      if (!e.message.startsWith("Duplicate")) {
        console.log(e);
      }
    }
  }

  public async getUser(userID: String): Promise<User> {
    const [res, _] = await this.cnt.query<UserSqlRes[]>(`SELECT * from users WHERE usr_id = "${userID}"`);
    return res[0];
  }

  public async setTemplate(userID: string, options: template): Promise<void> {
    if (!options) return;
    if (Object.keys(options).length === 0) return;

    let query: String[] = [
      options.temp_type ? "templade_type = " + options.temp_type : "",
      options.Pcolor ? `pri_color =  '${options.Pcolor}'` : "",
      options.Scolor ? `sec_color = '${options.Scolor}'` : "",
    ];
    await this.cnt.query(
      "Update users SET " + query.join(",") + `, last_tmp_changed =  CURRENT_TIMESTAMP ` + `WHERE usr_id = "${userID}"`
    );
  }

  public async deleteUser(userID: string): Promise<void> {
    await this.cnt.query(`Delete from users WHERE usr_id = "${userID}"`);
  }
}

interface template {
  temp_type?: number;
  Pcolor?: String;
  Scolor?: String;
}
interface UserSqlRes extends RowDataPacket, User {}

export default  Users ;
