import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
  bindActionCreators,
  RootState,
  dashboardActions,
  loadingActions,
  loadingReducerActions,
} from "@bot/client-context";
import { Link, useNavigate, useOutlet, useParams } from "react-router-dom";
import { apiError, optionsBase } from "@bot/types";
import { getServerConfig, updateInfo } from "@bot/client-services";
import { ErrorPage } from "./Error";
import { PUBLIC } from "@bot/config";
import { Embed, SaveButton, SwitchButton } from "@bot/client-components";
import { DiscordLogo } from "@bot/client-public";

import "@bot/client-components/styles/ServerDashboard.css"

export default function GuildDashboard() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const outlet = useOutlet();
  const { serverid } = useParams();
  const [guildEdited, setGuildConfig] = useState<optionsBase>({});
  const { loadingState, currentGuild } = useSelector((state: RootState) => ({
    loadingState: state.loading,
    currentGuild: state.dasboard,
  }));
  const path = "/dashboard/" + currentGuild?.id;
  const globalStates = {
    loading: bindActionCreators(loadingActions, dispatch),
    currentGuild: bindActionCreators(dashboardActions, dispatch),
  };
  const saveData = () => {
    if (Object.keys(guildEdited).length > 0) {
      updateInfo(serverid!, guildEdited)
        .then(() => {
          globalStates.currentGuild.setCurrent({ ...currentGuild, ...guildEdited });
          setGuildConfig({});
        })
        .catch((err: apiError<optionsBase>) => {
          if (err.newInfo) {
            globalStates.currentGuild.setCurrent({ ...currentGuild, ...err.newInfo });
          }
        });
    }
    setGuildConfig({});
  };

  useEffect(() => {
    globalStates.loading.loading();
    if (serverid) {
      globalStates.loading.loading();
      getServerConfig(serverid)
        .then((guild) => {
          globalStates.currentGuild.setCurrent(guild);
        })
        .catch(() => {
          globalStates.currentGuild.getOut();
          navigator(-1);
        })
        .finally(() => globalStates.loading.loaded());
    }
    return () => {
      globalStates.currentGuild.getOut();
    };
  }, []);

  return serverid && loadingState === loadingReducerActions.loaded ? (
    <>
      {Object.keys(guildEdited).length > 0 ? <SaveButton onClick={() => saveData()} /> : <></>}
      {outlet || (
        <>
          <div className="server-dashb-cont">
            <img
              src={
                currentGuild.icon ? `${PUBLIC.DISCORD_CDN}icons/${currentGuild.id}/${currentGuild.icon}` : DiscordLogo
              }
              alt=""
            />
            <Embed title={currentGuild.name || "Top Sercert"}>
              <div className="server-dasboard-embed">
                <div>
                  Public leaderBoard
                  <SwitchButton
                    initalState={currentGuild?.public_leader}
                    size={2.5}
                    fn={(val) => {
                      if (val !== currentGuild.public_leader) {
                        setGuildConfig({ ...guildEdited, public_leader: val });
                      } else {
                        let newData = { ...currentGuild };
                        delete newData.public_leader;
                        setGuildConfig(newData);
                      }
                    }}
                  />
                </div>
                <label>
                  <h5>Prefix</h5>
                  <input
                    maxLength={5}
                    type="text"
                    placeholder={currentGuild.prefix}
                    onChange={(data) => {
                      data.target.value = data.target.value.replace(/\s/g, "");
                      if (data.target.value === guildEdited.prefix) return;
                      if (data.target.value === currentGuild.prefix || /^\s*$/.test(data.target.value)) {
                        data.target.value = "";
                        const newInf = guildEdited;
                        delete newInf.prefix;
                        setGuildConfig(newInf);
                      } else {
                        setGuildConfig({
                          ...guildEdited,
                          prefix: data.target.value,
                        });
                      }
                    }}
                  />
                </label>
                <Link to={path + "/messages"}>Message Events</Link>
                <Link to={path + "/ranks"}>Ranks</Link>
              </div>
            </Embed>
          </div>
        </>
      )}
    </>
  ) : (
    <ErrorPage />
  );
}
