import { Request, Response } from "express";
import { optionsBase } from "@bot/types";
import { Servers } from "@bot/db";
import { getAServer, getGuildMember, AxiosError } from "@bot/dc-auth";
import { requestError } from "../../services/Errors";

export async function updateInfo(req: Request, res: Response) {
  const data: optionsBase = req.body;
  const ServerID = req.params.id;
  const guildManager = new Servers();
  try {
    const errorNotFound = requestError({
      status: 404,
      data: {
        type: "guild",
        value: ServerID,
      },
    });

    if (!ServerID) {
      throw res.status(404).send(errorNotFound);
    }

    const saveGuild = await guildManager.getServer(ServerID);

    if (!saveGuild) {
      throw res.status(404).send(errorNotFound);
    }

    const guild = await getAServer(ServerID)
      .then((inf) => inf.data)
      .catch<AxiosError<any>>((e) => e);

    if (guild instanceof Error) {
      res.status(guild.response?.status ?? 500);
      throw res.send({
        error: guild.message,
        message: guild.response?.data.error_desrription,
      });
    }

    if (guild.owner_id !== req.session.userid) {
      const user = await getGuildMember(req.session.token!.token, ServerID)
        .then((inf) => inf.data)
        .catch<AxiosError<any>>((e) => e);
      if (user instanceof Error) {
        res.status(user.response?.status ?? 500);
        throw res.send({
          error: user.message,
          message: user.response?.data.error_description,
        });
      }
      const admin = guild.roles.find((val) => (val.permissions & 8) === 8 && user.roles.indexOf(val.id) >= 0);
      if (!admin) {
        throw res.status(403).send(
          requestError({
            status: 403,
            data: {
              value: user.user.id,
            },
          })
        );
      }
    }

    await new Promise<void>(async (resolve, reject) => {
      const entries = Object.entries(data);

      for (let [key, val] of entries) {
        switch (key) {
          case "prefix":
            await guildManager.setColunm([key, <string>val], ServerID).catch((e) => reject(e));
            break;
          case "public_leader":
            await guildManager.setColunm([key, <boolean>val], ServerID).catch((e) => reject(e));
            break;
        }
      }
      resolve();
    })
      .then(() => res.status(204).send())
      .catch(async (e) => {
        const newData = await guildManager.getServer(ServerID);
        throw res.status(500).send(
          requestError<optionsBase>({
            status: 500,
            message: e.sqlMessage,
            info: {
              prefix: newData.prefix,
              public_leader: Boolean(newData.public_leader),
            },
          })
        );
      });
  } catch (e) {
  } finally {
    guildManager.close();
  }
}
