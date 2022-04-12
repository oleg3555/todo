import App from "../App";
import {ReduxProviderDecorator} from "./ReduxProviderDecorator";
import React from "react";

export default {
    title: 'App',
    component: App,
    decorators: [ReduxProviderDecorator],
}

export const AppBaseExample = () => {
    return <App/>
}