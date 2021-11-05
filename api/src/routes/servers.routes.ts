import { Router } from "express";
import { servers, serverColum } from "../crud/tables/servers";

const serverRouter = Router();

serverRouter.post('/:serverId', async (req, res) => {
    const ip = req.ip;
    const newSv = req.params.serverId;
    res.set('Content-Type', 'application/json');

    if (ip == process.env.BOT) {
        await servers.putServer(newSv).catch(()=>{});
        res.status(201).send({ status: 'succes' });
    } else {
        res.status(401).send({ error: 'forbbiden' });
    }
})
serverRouter.get('/:serverId/:type', async (req, res) => {
    const type = <serverColum>req.params.type;

    res.set('Content-Type', 'application/json');

    await servers.getColunm(type, req.params.serverId).then(inf => {
        if (!inf) {
            res.status(204).send();
        } else {
            res.status(200).send({ colunm: inf });
        }
    }).catch(e => {
        if (e.code == 'ER_BAD_FIELD_ERROR') {
            res.status(400).send({ error: e.message });
        } else {
            res.status(500).send(e);
        }
        return;
    })
})
serverRouter.put('/:serverId/:type/:content', async (req, res) => {
    const serverID = req.params.serverId;
    const newContent = req.params.content;
    const colunm = <serverColum>req.params.type;
    const ip = req.ip;

    res.set('Content-Type', 'application/json');

    if (ip == process.env.BOT) {
        servers.setColunm(colunm, serverID, newContent);
        res.status(201).send({ status: 'succes' });
    } else {
        res.status(401).send({ error: 'forbbiden' });
    }
})
serverRouter.delete('/:serverId/:type', async (req, res) => {
    try {
        const serverID = req.params.serverId;
        const colunm = <serverColum>req.params.type;
        const ip = req.ip;

        res.set('Content-Type', 'application/json');

        if (ip != process.env.BOT) {
            res.status(401).send({ error: 'forbbiden' });
            return;
        }

        if (colunm == 'prefix') {
            servers.setColunm('prefix', serverID, 'waifu')
        } else {
            servers.setColunm(colunm, serverID, '0');
        }
        res.status(204).send();
    } catch (e: any) {
        res.status(500).send({error: e.code})
    }
})

export default serverRouter;