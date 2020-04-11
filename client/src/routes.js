import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {CoversPage} from "./pages/CoversPage";
import {CreatePage} from "./pages/CreatePage";
import {AuthPage} from "./pages/AuthPage";
import {DetailPage} from "./pages/DetailPage";

const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/' exact>
                    <MainPage/>
                </Route>
                <Route path='/covers' exact>
                    <CoversPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )

    }
    return (
        <Switch>
            <Route path='/' exact>
                <MainPage/>
            </Route>
            <Route path='/covers' exact>
                <CoversPage/>
            </Route>
            <Route path='/auth' exact>
                <AuthPage/>
            </Route>
            <Route path="/detail/:id">
                <DetailPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
export default useRoutes;