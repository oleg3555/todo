import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk'
import {todolistReducer} from "./reducers/todolistReducer";
import {taskReducer} from "./reducers/taskReducer";
import {appStatusReducer} from "./reducers/appStatusReducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app:appStatusReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
