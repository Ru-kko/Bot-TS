import { useEffect, useState, useRef, HTMLAttributes, CSSProperties } from "react";
import useWritter from "../../hooks/useWriter";
import Embed from "../embed/Embed";
import { Add, Arrow, Config, Invite, Plus, Tag } from "../Svgs";
import "./Bar.css";


export default () => {
    const _this = useRef<HTMLParagraphElement>(null);
    const channelsContainer = useRef<HTMLDivElement>(null);
    const [embedStyle, setEmbedStyle] = useState<CSSProperties>({
        display: "flex",
        overflow: "clip",
        flexDirection: "row",
        transition: "all linear 1s",
        transformOrigin: "0 0",
        transform: "scaleY(0)",
        height: "0"
    })
    const [messageText, run] = useWritter<void>(
        "waifu init",
        { lineFliker: true, flikerCount: 3, initialText: 'Send message to #general'},
        function () {
            _this.current!.style.color = "#62656B";
            _this.current!.innerText = "send message to #Info";

            setEmbedStyle({...embedStyle,height: "auto" ,transform: "scaleY(1)"})
            channelsContainer.current!.style.height = "auto";
            channelsContainer.current!.style.width = "40vh";
            channelsContainer.current!.style.boxShadow =
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px";
        }
    );
    const [canSee, checking] = useState(false);

    let observer = new IntersectionObserver(([entry]) => {
        checking(entry.isIntersecting);
        if (entry.isIntersecting) observer.disconnect();
    });

    useEffect(() => {
        observer.observe(_this.current!);
    }, []);

    useEffect(() => {
        if (canSee) {
            setTimeout(async () => {
                _this.current!.innerText = "";
                _this.current!.style.color = "white";
                run();
            }, 500);
        }
    }, [canSee]);
    return (
        <div className="message-bar-container">
            <div className="channels" ref={channelsContainer}>
                <div className="message-channel group-channel">
                    <Arrow /> <b>STAF</b> <Plus />
                </div>
                <div className="message-channel">
                    <Tag />
                    <b>config</b>
                    <div className="mesagge-channel-svg-group">
                        <Config />
                        <Invite />
                    </div>
                </div>
                <div className="message-channel selected">
                    <Tag />
                    <b>Info</b>
                    <div className="mesagge-channel-svg-group">
                        <Config />
                        <Invite />
                    </div>
                </div>
            </div>
            <div className="messages-container">
                <div style = {embedStyle}>
                    <Embed title={"test"} footer={true}>
                        <p>
                            <span className="message-ping">@ John-Doe</span>{" "}
                            started the moderation settigs
                        </p>
                    </Embed>
                    <div className="message-bar-description">
                        <h4>
                            Moderate, customise and check your server's
                            authority log
                        </h4>
                    </div>
                </div>
                <div className="mesage-bar">
                    <Add />
                    <div className="Message-bar-txt">
                        <p ref={_this}>{ messageText }</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
