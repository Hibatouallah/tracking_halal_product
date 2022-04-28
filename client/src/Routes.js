import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./containers/AppliedRoute";
import NotFound from "./containers/NotFound";
import Inscription from "./Inscription";
import Listecomptes from "./Listecomptes";
import Modifierclient from "./Modifierclient"
export default ({ childProps }) =>
  <Switch>
    { /* routes */ }
    <AppliedRoute path="/Inscription" exact component={Inscription} props={childProps} />
    <AppliedRoute path="/Listecomptes" exact component={Listecomptes} props={childProps} />
    <AppliedRoute path="/Modifierclient" exact component={Modifierclient} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>