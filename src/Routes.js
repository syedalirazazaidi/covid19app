import React, { Component } from "react";
import Map from "./components/Map";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Chart from "./components/apiCall/chart";
class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Map} />
          <Route path="/chart" component={Chart} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
