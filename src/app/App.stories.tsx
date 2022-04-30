import App from "./App";
import {ReduxProviderDecorator} from "../stories/decorators/ReduxProviderDecorator";
import React from "react";

export default {
    title: 'App',
    component: App,
    decorators: [ReduxProviderDecorator],
}

export const AppBaseExample = () => {
    return <App/>
}