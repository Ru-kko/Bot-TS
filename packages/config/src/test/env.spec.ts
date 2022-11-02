import { dir, getObj, configure } from "../configuration";

describe("confige package", () => {
  it("should get path to an env file", () => {
    expect(dir.replace(/(\/|\\)/g, "/").endsWith("/config/.env")).toBe(true);
  });

  it("should parse db_user variable", async () => {
    const Obj = await getObj();
    expect(typeof Obj.DB_USER).toBe("string");
  });

  it("should set configuration from process env", async () => {
    await configure();
    expect(process.env.COOKIE_PSW).not.toBeUndefined();
    expect(process.env.DB_NAME).not.toBeUndefined();
    expect(process.env.DB_PASSWORD).not.toBeUndefined();
    expect(process.env.DB_USER).not.toBeUndefined();
    expect(process.env.DC_CLIENT_ID).not.toBeUndefined();
    expect(process.env.DC_SECRET).not.toBeUndefined();
    expect(process.env.DC_TOKEN).not.toBeUndefined();
    expect(process.env.DC_REDIRECT_ENDPOINT).not.toBeUndefined();
    expect(process.env.PORT).not.toBeUndefined();
  });
});
