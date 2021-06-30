import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Navbar from './components/misc/Navbar';
import Home from './components/misc/Home';
import Register from './components/misc/auth/Register';
import Login from './components/misc/auth/Login';

function Router(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route exact path="/home"><Home/></Route>
                <Route path="/login"><Login/></Route>
                <Route path="/register"><Register/></Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;