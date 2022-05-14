import { Router } from "express";
import { getAll } from "../controllers/server";

const serverRouter = Router();

serverRouter.post('/', getAll)
export default serverRouter;