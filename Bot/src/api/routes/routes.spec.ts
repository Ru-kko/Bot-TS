import request from "supertest";
import { SessionsDataBase } from "../../crud/tables/sessions";
import { TestServer, testUrl } from "../../testSetup";

beforeAll(async () => {
    process.env = {
        ...process.env,
        testDCcode: "kwj9dmSShxMbCIPQaln6MhDvLDrf0v",
    };
});

describe("/server", () => {
    let sessionManager: SessionsDataBase;
    let cookie: string, sid: string;

    beforeAll(() => {
        sessionManager = new SessionsDataBase();
    });

    it("Response with status 200 and put a session data in database", async () => {
        const res = await request(testUrl).post(
            "/auth/dc/registre?code=" + process.env.testDCcode
        );
        cookie = res.headers["set-cookie"][0];
        sid = cookie?.slice(16, 48);
        const data = await sessionManager.has(sid);

        expect(res.status).toEqual(200);
        expect(data).toBe(true);
    });
    it("shuld delete a saved session", async () => {
        const res = await request(testUrl)
            .delete("/auth/dc/logout")
            .set("Cookie", [cookie]);
        const has = await sessionManager.has("sid");

        expect(res.status).toBe(205);
        expect(has).toBe(false);
    });
    afterAll(async () => await sessionManager.close());
});
