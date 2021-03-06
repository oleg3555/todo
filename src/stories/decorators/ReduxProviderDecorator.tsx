import {todolistReducer, TodolistType} from "../../redux/reducers/todolistReducer";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../../redux/reducers/taskReducer";
import {AppRootStateType} from "../../redux/store";
import React from "react";
import {Provider} from "react-redux";
import {TaskPriorities, TaskStatuses} from "../../api/api";
import {appStatusReducer, appStatusStateType} from "../../redux/reducers/appStatusReducer";
import thunk from "redux-thunk";
import {tasksStateType} from "../../pages/Todolists/Todolists";


type storeType = {
    tasks: tasksStateType,
    todolists: Array<TodolistType>,
    app: appStatusStateType,
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
                todoListId: todolistId1,
                fetchStatus: 'idle',
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
                todoListId: todolistId1,
                fetchStatus: 'idle',
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
                todoListId: todolistId1,
                fetchStatus: 'idle',
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
                todoListId: todolistId2,
                fetchStatus: 'idle',
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
                todoListId: todolistId2,
                fetchStatus: 'idle',
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
                todoListId: todolistId2,
                fetchStatus: 'idle',
            },
        ]
    },
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', fetchStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', fetchStatus: 'idle'},
    ],
    app: {
        error: '',
        isFetching: false,
        isInitialized: false,
        isUserAuth: false,
    }
}

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appStatusReducer,
})

const storyBookStore = createStore(rootReducer, initGlobalStore as AppRootStateType, applyMiddleware(thunk))

export const ReduxProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}