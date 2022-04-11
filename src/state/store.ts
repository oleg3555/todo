import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolistReducer";
import {taskReducer} from "./taskReducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
