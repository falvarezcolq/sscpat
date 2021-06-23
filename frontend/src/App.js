import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
// import LogoutComponent from "./components/LogoutComponent";
// import {useTranslation} from "react-i18next";
// import Config from "./utils/Config";
import Error_404 from "./components/404";
import { Provider } from "react-redux";
import store from "./store";
// import RoutesAdmin from "./utils/RoutesAdmin";
// import RoutesStudent from "./utils/RoutesStudent";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route
            exact
            path={Config.logoutPageUrl}
            component={LogoutComponent}
          ></Route> */}

          {/* <RoutesAdmin/> */}

          {/* <Route
            exact
            path={Config.logoutPageUrl}
            component={LogoutComponent}
          /> */}
          <Route component={Error_404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
