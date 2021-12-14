import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Test from './pages/Home';
import Background from './components/BackGround/BackGround';
import Footer from './components/Footer/Footer'

import './app.css';

ReactDOM.render(
    <Router >
        <Background>
            <Routes>
                <Route path="/" element={<Test />} />
            </Routes>
        </Background>
        <Footer />
    </Router >,
    document.getElementById("app")
);