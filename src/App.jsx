import React from "react";
import PrivateRoute from "./Components/PrivateRoute";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import HomeMain from "./Pages/Home/Home";
import Readlater from "./Pages/Home/Readlater";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/savedlater" component={Readlater} />
        <Route
          path="/"
          render={(props) => <PrivateRoute Component={HomeMain} {...props} />}
        />
      
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
