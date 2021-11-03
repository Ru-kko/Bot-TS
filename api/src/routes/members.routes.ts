import { Router } from "express";
import members from "../crud/tables/membres";

const memberRouter = Router();

memberRouter.put('/updatexp/:user/:server/:xp', async (req, res) => {
    const [user, server, xp] = [req.params.user, req.params.server, parseInt(req.params.xp)]

    const ip = req.ip;

    res.set('Content-Type', 'application/json');

    if (ip != process.env.BOT) {
        res.status(401).send({ error: 'forbbiden' });
        return;
    }

    const responseType = await members.addXp(user, server, xp);

    res.status(201).send({ status: responseType[0], message: responseType[1] });
})