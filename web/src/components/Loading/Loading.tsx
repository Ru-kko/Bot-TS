import { CSSProperties } from 'react';
import './Loading.css'


export default (props: {
    Style?: CSSProperties;
    Clasess?: string; 
}) => {

    const animDelay = (delay?: number) => `loadingPointsAnim .4s ease-out ${delay ? delay + 's' : ''} infinite alternate`;

        return <div className={'loading-text ' + props.Clasess} style={props.Style}>
            Loading
            <span style={{ animation: animDelay() , transform: ''}}>.</span>
            <span style={{ animation: animDelay(.2) }}>.</span>
            <span style={{ animation: animDelay(.4) }}>.</span>
        </div>;
    };
