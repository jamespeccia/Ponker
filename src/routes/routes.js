import React from 'react';
import {Route, Switch} from "react-router";
import {LoginPage} from "../components/LoginPage/LoginPage";
import {RegisterPage} from "../components/RegisterPage/RegisterPage";
import {ProfilePage} from "../components/ProfilePage/ProfilePage";
import GamePage from "../components/GamePage/GamePage";
import HomePage from "../components/HomePage/HomePage";
import Loading from "../components/Loading/Loading";

import UserListPage from "../components/ProfileListPage/UserListPage";
import {LogoutPage} from "../components/Logout/Logout";
import JoinGame from "../components/JoinGame/JoinGame";
import Settings from "../components/Settings/Settings";

function Routes() {

    return (
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/users" component={UserListPage}/>
            <Route exact path="/users/:id" component={ProfilePage}/>
            <Route exact path="/loading" component={Loading}/>
            <Route exact path="/join" component={JoinGame}/>
            <Route exact path="/logout" component={LogoutPage}/>
            <Route exact path="/game/:pin" component={GamePage}/>
            <Route exact path="/settings" component={Settings}/>
        </Switch>
    );
}

export default Routes;