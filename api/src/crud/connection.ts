import { createPool, Pool } from 'mysql2/promise';

export async function connection(): Promise<Pool> {
    const pool = createPool({
        host: 'localhost',
        database: process.env.Data_Base,
        user: process.env.DB_user,
        password: process.env.DB_password
    });
    return pool;
};