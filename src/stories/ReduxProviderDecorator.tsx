import {todolistReducer} from "../state/todolistReducer";
import {v1} from "uuid";
import {tasksStateType, todolistType} from "../App";
import {combineReducers, createStore} from "redux";
import {taskReducer} from "../state/taskReducer";
import {AppRootStateType} from "../state/store";
import React from "react";
import {Provider} from "react-redux";


type storeType = {
    tasks: tasksStateType,
    todolists: Array<todolistType>,
}

const todolistId1 = v1();
const todolistId2 = v1();

const initGlobalStore: storeType = {
    tasks: {
        [todolistId1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'React', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Pepsi', isDone: true},
            {id: v1(), title: 'Crisps', isDone: false},
        ]
    },
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
}

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
})

const storyBookStore = createStore(rootReducer, initGlobalStore as AppRootStateType)

export const ReduxProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}