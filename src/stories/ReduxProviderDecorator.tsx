import {todolistReducer, TodolistType} from "../state/todolistReducer";
import {v1} from "uuid";
import {tasksStateType} from "../App";
import {combineReducers, createStore} from "redux";
import {taskReducer} from "../state/taskReducer";
import {AppRootStateType} from "../state/store";
import React from "react";
import {Provider} from "react-redux";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


type storeType = {
    tasks: tasksStateType,
    todolists: Array<TodolistType>,
}

const todolistId1 = v1();
const todolistId2 = v1();

const initGlobalStore: storeType = {
    tasks: {
        [todolistId1]: [
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'TypeScript',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.High,
                startDate: '',
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Pepsi',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Crisps',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.High,
                startDate: '',
                todoListId: todolistId2
            },
        ]
    },
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
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