import React from "react";
import Users from "./components/users";
import User from "../src/components/user";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
            </div>
            <Switch>
                <Route path="/user/:userId" component={User} />
                <Route path="/main" component={Main} />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
