import React from "react";
import Story from "../pages/Story";
import Home from "../pages/Home";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames{
    'HOME' = '/',
    'STORY' = '/story/:id'
}

export const routes: IRoute[] = [
    {path: RouteNames.HOME, component: Home, exact: true},
    {path: RouteNames.STORY, component: Story, exact: true}
]
