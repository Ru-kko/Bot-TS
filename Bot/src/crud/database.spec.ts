import dontEnv from "dotenv";
import { Servers } from "./tables/servers";
import { Users } from "./tables/users";

beforeAll(async () => {
    dontEnv.config();
});

describe("users", () => {
    it("Should responds with an user. [Users.putUser && Users.getUser]", async () => {
        const db = new Users();
        await db.putUser("1");

        expect((await db.getUser("1"))?.usr_id).toEqual(1);

        db.close();
    });

    it("Should change the template type other number", async () => {
        const db = new Users();
        await db.setTemplate("1", {
            temp_type: 2,
            Pcolor: "FFFFFF",
            Scolor: "000000",
        });
        const res = await db.getUser("1");
        const lastChange = new Date(res.last_tmp_changed);
        const lastChangeExpect = new Date();

        db.close();
        expect(res.pri_color).toBe("FFFFFF");
        expect(res.sec_color).toBe("000000");
        expect(res.templade_type).toBe(2);
        expect(lastChange.getFullYear()).toBe(lastChangeExpect.getFullYear());
        expect(lastChange.getUTCMonth()).toBe(lastChangeExpect.getUTCMonth());
        expect(lastChange.getUTCDay()).toBe(lastChangeExpect.getUTCDay());
    });

    it("Should responds with empty object", async () => {
        const db = new Users();
        await db.deleteUser("1");
        const none = await db.getUser("1");
        db.close();
		expect(none).toBe(undefined);
    });
});

describe("servers", async () => {
    it("Should add a server and get the same ", async () => {
        const db = new Servers();
        await db.putServer("1");

        const server = await db.getServer("1");
        db.close();

        expect(server.prefix).toBe("waifu");
        expect(server.sv_id).toBe(1);
    });

    it(`Should change server props.
	   [prefix-notify_warn-muted_rol-log_channel-wlecome_channel-welcome_ms]`, async () => {
        const db = new Servers();

        await db.setColunm(["prefix", "test"], "1");
        await db.setColunm(["notify_warn", 30], "1");
        await db.setColunm(["muted_rol", 1000], "1");
        await db.setColunm(["log_channel", 57294381], "1");
        await db.setColunm(["welcome_msg", 1], "1");
        await db.setColunm(["wlecome_channel", 213123], "1");

        const change = await db.getServer("1");
        db.close();

        expect(change.prefix).toBe("test");
        expect(change.notify_warn).toBe(30);
        expect(change.muted_rol).toBe(1000);
        expect(change.log_channel).toBe(57294381);
        expect(change.welcome_msg).toBe(1);
        expect(change.wlecome_channel).toBe(213123);
    });

    it("Should delete a server", async () => {
        const db = new Servers();

        await db.deleteServer("1");
        const deleted = await db.getServer("1");
        db.close();

        expect(deleted).toBe(undefined);
    });

	it("Should create a server when pass second prop", async () => {
		const db = new Servers();	
		const res = await db.getServer("2", true);
		
		await db.deleteServer("2")
		db.close();

		expect(res.sv_id).toBe(2);
		expect(res.prefix).toBe("waifu");
	});
});
