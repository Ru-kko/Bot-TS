import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import { Wave } from "@bot/client-components";

import "./style.css";
import { useLocation } from "react-router-dom";
import { loadingReducerActions, RootState, useSelector } from "@bot/client-context";

export function Background(props: PropsWithChildren<{}>) {
  const location = useLocation();
  const loading = useSelector((state: RootState) => state.loading)
  const [height, setHeight] = useState<CSSProperties>({
    transform: `scaleY(0)`,
  });

  useEffect(() => {
    setHeight({
      transform: `scaleY(0)`,
    });
    if (loading === loadingReducerActions.loaded) {
      setTimeout(() => {
        setHeight({
          transform: `scaleY(1)`,
          transition: "transform .5s linear",
        });
      }, 100);
    }
  }, [location, loading]);
  return (
    <>
      <div className="backGrund" style={height}>
        <div className="content">{props.children}</div>
        <Wave />
      </div>
    </>
  );
}
