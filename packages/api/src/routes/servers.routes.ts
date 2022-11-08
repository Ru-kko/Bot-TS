import { Router } from "express";
import { getAll, getServer, updateInfo } from "../controllers/guilds";
import {Router as _router } from ".pnpm/@types+express-serve-static-core@4.17.31/node_modules/@types/express-serve-static-core"

const serverRouter = Router();

serverRouter.get('/', getAll);
serverRouter.get('/:id', getServer);
serverRouter.put('/:id', updateInfo)

export default serverRouter;