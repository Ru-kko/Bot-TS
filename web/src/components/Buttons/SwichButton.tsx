import { CSSProperties, useState } from "react";
import "./style.css";

interface switchProps {
    fn: (state: boolean) => void;
    initalState?: boolean;
    size?: number;
    color?: string;
}

export function SwichButton(props: switchProps) {
    const width = props.size ?? 4;
    const size = `${width / 1.7}rem`;
    const [checkState, setCheck] = useState<boolean>(props.initalState || false);
    const transition: CSSProperties = checkState
        ? {
              color: "#57F288",
              transform: `translateX(${width - width / 1.7}rem)`,
          }
        : {};
    const update = () => {
        setCheck(!checkState);
        props.fn(!checkState);
    };

    return (
        <>
            <div>
                <label
                    className="switch-cont"
                    style={{
                        backgroundColor: checkState ? "#57F288" : "#62656B",
                        padding: `${width * 0.03}rem`,
                        width: `${width}rem`,
                        height: size,
                    }}
                >
                    <input
                        type="checkbox"
                        className="switch-btn"
                        onChange={update}
                        checked={checkState}
                    />
                    <span
                        style={{
                            color: checkState ? "#57F288" : "#62656B",
                            height: size,
                            width: size,
                            fontSize: `${width * 0.5}rem`,
                            ...transition,
                        }}
                    >
                        {checkState ? "✓" : "✖"}
                    </span>
                </label>
            </div>
        </>
    );
}
