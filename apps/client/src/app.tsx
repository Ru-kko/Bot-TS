import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { bindActionCreators, loadingActions, useDispatch } from "@bot/client-context";
import { isLoged, logOut } from "@bot/client-services";
import { Footer, Navigation } from "@bot/client-components";
import { PrivateRoute } from "./partials/PrivateRoute";
import { Background } from "./partials/backgorund";
import { Home } from "./pages";

import "./app.css";
import { DiscordLogIn } from "./pages/Auth";
import { Dashboard } from "./pages/DashBoard";
import GuildDashboard from "./pages/GuildDashboard";

export function App() {
  const dispatch = useDispatch();
  const { loading, loaded } = bindActionCreators(loadingActions, dispatch);

  useEffect(() => {
    loading();
    isLoged(dispatch).finally(() => loaded());
  }, []);

  return (
    <>
      <Navigation logOut={logOut} />
      <Background>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/discord" element={<DiscordLogIn />} />
          {/* <Route path="/cmd" element={<Commads />} /> */}
          <Route path="/dashboard" element={<PrivateRoute Component={<Dashboard />} />} />
          <Route path="/dashboard/:serverid/" element={<PrivateRoute Component={<GuildDashboard />} />}/>
          <Route path="messages" element={<>daa</>} />
          <Route path="ranks" element={<>daa</>} />
          <Route path="*" element={<>Error</>} />
          {/* </Route> */}
          <Route path="/leader/:leader" element={<>leader</>} />
          <Route path="*" element={<>Error</>} />
        </Routes>
      </Background>
      <Footer />
    </>
  );
}
