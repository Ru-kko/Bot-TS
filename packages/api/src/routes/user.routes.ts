import { Router } from "express";
import { getUser } from "../controllers/users";
import {Router as _router } from ".pnpm/@types+express-serve-static-core@4.17.31/node_modules/@types/express-serve-static-core"

const userRouter = Router();

userRouter.get("" ,getUser);

export default userRouter;