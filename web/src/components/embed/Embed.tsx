import { PropsWithChildren } from "react";
import { Avatar } from "../images/images"
import "./embed.css"

interface options {
    color?: string,
    image?: string,
    title: String,
    footer?: boolean
}
export default (props: PropsWithChildren<options>) => {
    const footer = () => {
        if (props.footer) {
            const todayDate = new Date();
            return (
                <p
                    style={{
                        fontWeight: 600,
                        fontSize: ".7em",
                        margin: "0 2.5vh 5px",
                        color: "#62656B",
                    }}
                >
                    {todayDate.getMonth() + '/' + todayDate.getDay() + '/' + todayDate.getFullYear()}
                </p>
            );
        }
    }
    return (
        <div className='embed'>
            <div className="embed-content" style={{borderColor: props.color ?? '#57F288' }}>
                <div className="embed-header" style={{marginTop: '10px'}}>
                    <img src={props.image ?? Avatar} />
                    <h4 style={{margin: '0px'}}>{props.title}</h4>
                </div>
                {props.children}
                {footer()}
            </div>
        </div>
    )
}