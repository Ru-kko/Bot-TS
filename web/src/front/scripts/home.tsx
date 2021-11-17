import React from 'react';
import ReactDOM from 'react-dom';
import Background from '../components/background';
import Foot from '../components/foo';
import App from '../components/helloworld';

ReactDOM.render(
    <React.StrictMode>
        <Background content= {new App({})}/>
        <Foot/>
    </React.StrictMode>,
    document.getElementById("root")
);