import { Router } from "express";
import { getAll, getServer, updateInfo } from "../controllers/guilds";

const serverRouter = Router();

serverRouter.get('/', getAll);
serverRouter.get('/:id', getServer);
serverRouter.put('/:id', updateInfo)

export default serverRouter;