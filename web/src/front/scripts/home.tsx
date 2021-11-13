import React from 'react';
import ReactDOM from 'react-dom';
import Background from '../components/background';
import foo from '../components/foo';
import App from '../components/helloworld';

ReactDOM.render(
    <React.StrictMode>
        <Background content= {new App({})}/>
        <footer></footer>
    </React.StrictMode>,
    document.getElementById("root")
);