import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import MainRoute from "./MainRoute";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
const Routes = () => {
  return (
    <Router>
      <Switch>
          <MainRoute component={Home} path="/" exact />
        <MainRoute component={AuthPage} path="/login" exact />
        <MainRoute component={RegisterPage} path="/register" exact/>
      </Switch>
    </Router>
  );
};
export default Routes;
