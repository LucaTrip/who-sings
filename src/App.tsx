import React from "react";
import * as dotenv from "dotenv";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { GlobalProvider } from "./app/context/GlobalContext";

import PublicRoute from "./app/routers/PublicRoute";
import PrivateRoute from "./app/routers/PrivateRoute";

import Header from "./app/components/Header";
import HomeScreen from "./app/screens/HomeScreen";
import UserInputScreen from "./app/screens/UserInputScreen";
import AccountScreen from "./app/screens/AccountScreen";
import GameScreen from "./app/screens/GameScreen";
import GlobalChartScreen from "./app/screens/GlobalChartScreen";

const App = () => {
  dotenv.config({ path: "../.env" });

  return (
    <GlobalProvider>
      {/* <Router>
        <div className="App">
          <Nav />

          <Switch>
            <PublicRoute path="/login" component={LoginSignupScreen} />
            <PublicRoute path="/signup" component={LoginSignupScreen} />
            <PrivateRoute path="/home" component={UserListScreen} />
            <PrivateRoute
              path="/createuser"
              component={CreateUpdateUserScreen}
            />
            <PrivateRoute
              path="/userdetail/:nickname"
              component={UserDetailScreen}
            />
            <PrivateRoute path="/" component={UserListScreen} />
          </Switch>
        </div>
      </Router> */}

      <Router>
        <div className="bg-gray-200 h-screen overflow-y-scroll overflow-x-hidden font-sans">
          <Header />

          <Switch>
            <PrivateRoute path="/home" component={HomeScreen} />
            <PrivateRoute path="/account" component={AccountScreen} />
            <PrivateRoute path="/game" component={GameScreen} />
            <PrivateRoute path="/chart" component={GlobalChartScreen} />

            <PublicRoute path="/" component={UserInputScreen} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
};

export default App;
