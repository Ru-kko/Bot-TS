import { RowDataPacket } from "mysql2/promise";
import { connection } from "../connection";
import { Server } from "@bot/types";

class Servers extends connection {
  public async getServer(ServerID: string, create?: boolean): Promise<ServerResponse> {
    const getter = async () =>
      await this.cnt.query<ServerResponse[]>(`SELECT * from servers WHERE sv_id = "${ServerID}"`);

    const [res, _] = await getter();
    if (res.length === 0 && create) {
      await this.putServer(ServerID);
      const [newSv, _] = await getter();
      return newSv[0];
    }

    return res[0];
  }

  public async putServer(ServerID: string): Promise<void> {
    try {
      await this.cnt.query(`INSERT INTO servers(sv_id) Values ("${ServerID}")`);
    } catch (e: Error | any) {
      if (!e.message.startsWith("Duplicate")) console.log(e);
    }
  }

  public async setColunm(Colunm: colunm, ServerID: string): Promise<void> {
    let query: string;

    switch (typeof Colunm[1]) {
      case "number":
        query = `${Colunm[0]} = ${Colunm[1]}`;
        break;
      case "string":
        query = `${Colunm[0]} = "${Colunm[1]}"`;
        break;
      case "boolean":
        query = `${Colunm[0]} = ${Colunm[1] ? "TRUE" : "FALSE"}`;
    }

    await this.cnt.query(`Update servers SET ${query} WHERE sv_id = "${ServerID}"`);
  }

  public async cosfigWelcomeMessage(ServerID: string, Config: Object) {
    // TODO Make them
  }

  public async deleteServer(ServerID: String): Promise<void> {
    await this.cnt.query(`Delete from servers WHERE sv_id = "${ServerID}"`);
  }
}

type colunm =
  | ["prefix", string]
  | ["notify_warn", number]
  | ["muted_rol", number]
  | ["log_channel", number]
  | ["welcome_msg", 1 | 0]
  | ["wlecome_channel", number]
  | ["customizer_channel", number]
  | ["public_leader", boolean];

interface ServerResponse extends RowDataPacket, Server {}

export default Servers;
