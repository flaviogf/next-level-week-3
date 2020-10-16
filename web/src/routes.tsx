import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CreateOrphanage } from "./pages/CreateOrphanage";
import { Landing } from "./pages/Landing";
import { Orphanage } from "./pages/Orphanage";
import { OrphanagesMap } from "./pages/OrphanagesMap";

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <OrphanagesMap />
        </Route>

        <Route path="/orphanages/create">
          <CreateOrphanage />
        </Route>

        <Route path="/orphanages/:id">
          <Orphanage />
        </Route>

        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}
