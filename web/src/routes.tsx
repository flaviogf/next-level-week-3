import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { OrphanagesMap } from "./pages/OrphanagesMap";

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <OrphanagesMap />
        </Route>

        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}
