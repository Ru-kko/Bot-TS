import { createPool, Pool } from "mysql2/promise";
import "@bot/config/dist/configuration"

export class connection {
  protected cnt: Pool;

  constructor(cnt?: connection) {
    if (cnt) {
      this.cnt = cnt.cnt;
      return;
    }
    this.cnt = this.connect();
  }

  private connect(): Pool {
    if (!(process.env.DB_USER && process.env.DB_NAME && process.env.DB_PASSWORD))
      throw new Error("Not configured credentials");
    const pool = createPool({
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      decimalNumbers: false,
    });
    return pool;
  }

  public async close() {
    await this.cnt.end();
  }
}
