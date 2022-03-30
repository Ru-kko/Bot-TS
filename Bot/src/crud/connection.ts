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
        const pool = createPool({
            host: "localhost",
            database: process.env.Data_Base,
            user: process.env.DB_user,
            password: process.env.DB_password,
        });
        return pool;
    }
	
	public close() {
		this.cnt.end();	
	}
}

