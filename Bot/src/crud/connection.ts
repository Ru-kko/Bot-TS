import { createPool, Pool } from 'mysql2/promise';

export default async function(): Promise<Pool> {
    const pool = await createPool({
        host: 'localhost',
        database: process.env.Data_Base,
        user: process.env.DB_user,
        password: process.env.DB_password
    });
    return pool;
};