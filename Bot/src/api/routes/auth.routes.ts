import { Router } from "express";
import { logOut, registre } from "../controllers/sessions";

const authRouter = Router();

authRouter.post('/dc/registre', registre);
authRouter.delete('/dc/logout', logOut);

export default authRouter;
