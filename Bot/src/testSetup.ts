import dotEnv from "dotenv";
import Server from "./api/api";

let TestServer: Server;
const testUrl = "localhost:4200";
async function setup() {
    TestServer = new Server(4200, true);
    dotEnv.config();
    await TestServer.middlewares().routes().start();
}
async function teardown() {
    return new Promise<void>((resolve) =>{
        TestServer.app.close(() => resolve());
    });
}
export { TestServer, setup, teardown , testUrl};
