import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PageNotFound } from "./common/PageNotFound";
import requireAuth from "./common/requireAuth";
import { Auth } from "./features/auth/Auth.jsx";
import { Dashboard } from "./features/dashboard/Dashboard.jsx";

function App() {
  if (localStorage.getItem("Authenticated")) {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
      "Authenticated"
    )}`;
  }

  return (
    <div>
      <Router>
        <Switch>
          {/* <Route path="/unauthorized" component={Unauthorized} /> */}
          <Route path="/login">
            <Auth />
          </Route>
          <Route path="/signup">
            <Auth />
          </Route>
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
          <Route exact path="/" component={requireAuth(Dashboard)} />
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
