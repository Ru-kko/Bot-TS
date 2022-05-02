import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./app";
import { store } from "./context/store";

ReactDOM.createRoot(document.getElementById("app")!).render(
    // <React.StrictMode>
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    // </React.StrictMode>
);
