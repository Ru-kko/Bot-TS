import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../context/reducers";
import { loadingReducerActions } from "../../context/reducers/loading";
import { Wave } from "../Svgs";

import "./style.css";

export function Background(props: PropsWithChildren<{}>) {
    const location = useLocation();
    const loading = useSelector((state:RootState) => state.loading)
    const [height, setHeight] = useState<CSSProperties>({
        transform: `scaleY(0)`,
    });

    useEffect(() => {
        if(loading === loadingReducerActions.loaded) {
            setHeight({
                transform: `scaleY(0)`,
            });
            setTimeout(() => {
                setHeight({
                    transform: `scaleY(1)`,
                    transition: "transform .3s linear",
                });
            }, 100);
        }
    }, [location, loading]);
    return (
        <>
            <div className="backGrund" style={height}>
                <div className="content">
                    {props.children}
                </div>
                <Wave />
            </div>
        </>
    );
}
