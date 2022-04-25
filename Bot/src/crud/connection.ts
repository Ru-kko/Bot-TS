import { createPool, Pool } from "mysql2/promise";

export class connection {
    protected cnt: Pool;

    constructor(cnt?: connection) {
		if (cnt) {
			this.cnt = cnt.cnt;
			return;
		};
        this.cnt = this.connect();
    }
    
	private connect(): Pool {
		if (!(process.env.Data_Base && process.env.DB_user && process.env.DB_password)) 
			throw new Error("Not enviroment credentials variables");
        const pool = createPool({
            host: "localhost",
            database: process.env.Data_Base,
            user: process.env.DB_user,
            password: process.env.DB_password,
        });
        return pool;
    }
	
	public async close() {
		await this.cnt.end();	
	}
}

