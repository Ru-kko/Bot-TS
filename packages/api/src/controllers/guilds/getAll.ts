import { Request, Response } from "express";
import { guildsResponse } from "@bot/types";
import { Members } from "@bot/db";
import { getServers, AxiosError } from "@bot/dc-auth";

export async function getAll(req: Request, res: Response) {
  const servers = await getServers(req.session.token!.token).catch<AxiosError<any>>((e) => e);

  if (servers instanceof Error) {
    res.status(servers.response?.status ?? 500);
    console.log(servers);
    
    return res.send({
      error: servers.message,
      message: servers.response?.data.error_description,
    });
  }

  const memberManager = new Members();
  let data: guildsResponse = {};

  servers.data.forEach((guild) => {
    data[guild.id] = {
      name: guild.name,
      icon: guild.icon,
      owner: guild.owner,
      permissions: guild.permissions,
      permissions_new: guild.permissions_new,
      features: guild.features,
    };
  });
  const dbRes = await memberManager.getServersFromMember(req.session.userid!);
  memberManager.close();
  dbRes.forEach((isIn) => {
    data[isIn.sv_id].haveBot = true;
  });

  res.status(200);
  return res.send(data!);
}
