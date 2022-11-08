import { Router } from "express";
import { logged, logOut, registre } from "../controllers/sessions";
import {Router as _router } from ".pnpm/@types+express-serve-static-core@4.17.31/node_modules/@types/express-serve-static-core"

const authRouter = Router();

authRouter.post('/discord', registre);
authRouter.delete('/discord', logOut);
authRouter.get('/discord', logged);

export default authRouter;
