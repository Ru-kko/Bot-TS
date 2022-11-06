import { parse } from "dotenv";
import path from "node:path";
import fs from "node:fs/promises";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      //   SP_REDIRECT_ENDPOINT: string;
      PORT: string;

      DC_TOKEN: string;
      DC_SECRET: string;

      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;

      COOKIE_PSW: string;

      SERVICES_REQUESTS_URI: string;
      DB_PORT: string;
      DB_HOST: string;
    }
  }
}
export { PUBLIC } from ".";

const baseOptios: NodeJS.ProcessEnv = {
  DC_CLIENT_ID: "your discord client id",
  DC_REDIRECT_ENDPOINT: "enponts fron your redirect uri",
  DC_TOKEN: "Your discord bot token",
  DC_SECRET: "your dicord client secret",
  PORT: "prot of your backend server",
  DB_NAME: "bot", // name of your database
  DB_USER: "mysql user",
  DB_PASSWORD: "mysql password",
  COOKIE_PSW: "conocies encript password",
  SERVICES_REQUESTS_URI: "your microservice uri",
  DB_PORT: "3306", // database port
  DB_HOST: "localhost"
};
const dir = path.resolve(__dirname, "../.env");

async function getObj() {
  return parse(await fs.readFile(dir, "utf-8")) as Partial<NodeJS.ProcessEnv>;
}

/**
 * @waring do not use this package in frontend
 */
export const configure = async () => {
  process.env = { ...baseOptios, ...(await getObj()), ...process.env };
};
export { dir, getObj, baseOptios };
