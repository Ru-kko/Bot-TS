import ReactDOM from "react-dom/client";
import { App } from "./app";
import { Provider, store } from "@bot/client-context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("app")!).render(
  // <React.StrictMode>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  // </React.StrictMode>
);
