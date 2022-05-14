import request from "supertest";
import { SessionsDataBase } from "../../crud/tables/sessions";
import { testUrl } from "../../testSetup";


beforeAll(async () => {
    process.env = {
        ...process.env,
        testDCcode: "yZtl06ifpETJgOcBOBl3zAoCheesl7",
    };
});

describe("discord", () => {
    let sessionManager: SessionsDataBase;
    let cookie: string, sid: string;

    beforeAll(() => {
        sessionManager = new SessionsDataBase();
    });

    it("Response with status 200 and put a session data in database", async () => {
        const res = await request(testUrl).post(
            "/auth/discord?code=" + process.env.testDCcode
        );
        cookie = res.headers["set-cookie"][0];
        sid = cookie?.slice(16, 48);

        setTimeout(async () => {
            const data = await sessionManager.has(sid);

            expect(res.status).toEqual(200);
            expect(data).toBe(true);
        }, 200);
    });

    it("should respond with an object with status true because the user making the query is logged", async () => {
        const res = await request(testUrl)
            .get("/auth/discord")
            .set("Cookie", [cookie]);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
    });

    describe("/user", () => {   
        it("Should responds with an error because there are not credentials", async () => {
            const res = await request(testUrl).get("/user");
            expect(res.status).toBe(403);
        });

        it("Should responds with user data", async () => {
            const res = await request(testUrl).get("/user").set("Cookie", [ cookie ]);
    
            expect(res.status).toBe(200);
            expect(res.body.id !== undefined).toBe(true);
        });
    });

    it("shuld delete a saved session", async () => {
        const res = await request(testUrl)
            .delete("/auth/discord")
            .set("Cookie", [cookie]);
        const has = await sessionManager.has("sid");

        expect(res.status).toBe(205);
        expect(has).toBe(false);
    });

    it("should respond with an object with status false because the user making the query is not logged", async () => {
        const res = await request(testUrl).get("/auth/discord");

        expect(res.status).toBe(200);
        expect(res.body.status).toBe(false);
    });

    afterAll(async () => await sessionManager.close());
});

