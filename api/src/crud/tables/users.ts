import { connection } from "../connection";

const users = new class {
    async putUser(userID: number | String): Promise<void> {
        try {
            const cnt = await connection();
            await cnt.query(`INSERT INTO users(usr_id) Values(${userID})`);
            cnt.end();
        } catch (e) {
            console.log(e);
        }
        return;
    }
}

export default users;