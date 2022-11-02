import { useEffect, useRef } from "react";
import { useWritter } from "@bot/client-hooks";
import { Avatar } from "@bot/client-public";
import { useSelector, RootState } from "@bot/client-context";
import { Link } from "react-router-dom";
import { Embed, Line } from "./";
import { PUBLIC } from "@bot/config";
import "../styles/banner.css";

export const Banner = () => {
  const [writter, runWritter] = useWritter("Get better your server and moderate with me, an multipurpose bot");
  const sessionState = useSelector((state: RootState) => state.session);
  const imageLogo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    runWritter();
    setTimeout(() => {
      imageLogo.current!.className += " banner-zoom-btn";
    }, 750);
  }, []);
  return (
    <>
      <div className="Banner">
        <Embed title="Test bot" footer={true} color="cyan">
          <div className="banner-embed-conent">
            <p> {writter} </p>
          </div>
        </Embed>
        <div className="banner-big-logo">
          <a
            href={
              "https://discord.com/api/oauth2/authorize?client_id=" + PUBLIC.DC_CLIENT_ID + "&permissions=8&scope=bot"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img ref={imageLogo} className="banner-image-profile" src={Avatar} alt="Error" />
          </a>
          <div className="banner-buttons">
            <a
              href={
                "https://discord.com/api/oauth2/authorize?client_id=" + PUBLIC.DC_CLIENT_ID + "&permissions=8&scope=bot"
              }
              className="banner-button-white"
            >
              Add to discord
            </a>
            {sessionState ? (
              <Link to="dashboard" className="banner-button-blue">
                Dashboard
              </Link>
            ) : (
              <a
                href={
                  "https://discord.com/api/oauth2/authorize?client_id=" +
                  PUBLIC.DC_CLIENT_ID +
                  "&redirect_uri=" +
                  PUBLIC.CLIENT_URL +
                  PUBLIC.REDIRECT_ENDPOINT +
                  "&response_type=code&scope=identify%20guilds"
                }
                className="banner-button-blue"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
      <Line />
    </>
  );
};
