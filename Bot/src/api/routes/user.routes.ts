import { Router } from "express";
import { getUser } from "../controllers/users";

const userRouter = Router();

userRouter.get("" ,getUser);

export default userRouter;