import { Router } from "express";
import { getAll } from "../controllers/server";

const serverRouter = Router();

serverRouter.get('/', getAll)
export default serverRouter;