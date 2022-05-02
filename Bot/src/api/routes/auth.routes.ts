import { Router } from "express";
import { logged, logOut, registre } from "../controllers/sessions";

const authRouter = Router();

authRouter.post('/discord', registre);
authRouter.delete('/discord', logOut);
authRouter.get('/discord', logged);

export default authRouter;
