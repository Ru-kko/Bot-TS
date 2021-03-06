import { useEffect, useRef } from "react";
import useWriter from "../../hooks/useWriter";
import Embed from "../embed/Embed";
import Line from "../Horizontal_line/Line";
import { Avatar } from "../images/images";
import Config from "../../Config/values.config";
import "./banner.css";
import { useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import { Link } from "react-router-dom";

export default () => {
    const [writter, runWritter] = useWriter(
        "Get better your server and moderate with me, an multipurpose bot"
    );
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
                        href={Config.Discord.Invite}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            ref={imageLogo}
                            className="banner-image-profile"
                            src={Avatar}
                            alt="Error"
                        />
                    </a>
                    <div className="banner-buttons">
                        <a
                            href={Config.Discord.Invite}
                            className="banner-button-white"
                        >
                            Add to discord
                        </a>
                        {sessionState ? (
                            <Link to="dashboard" className="banner-button-blue">Dashboard</Link>
                        ) : (
                            <a
                                href={Config.Discord.Auth}
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
