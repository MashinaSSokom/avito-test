import React from "react";
import {routes, RouteNames} from "../router";
import {Switch, Route, Redirect} from "react-router-dom";

const AppRouter = () => {

    return (
        <Switch>
            {routes.map(route =>
                <Route path={route.path}
                       component={route.component}
                       exact={route.exact}
                       key={route.path}
                />
            )}
            <Redirect to={RouteNames.HOME}/>
        </Switch>
    )
}

export default AppRouter