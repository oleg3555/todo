import {todolistReducer, TodolistType} from "../../redux/reducers/todolistReducer";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../../redux/reducers/taskReducer";
import {AppRootStateType} from "../../redux/store";
import React from "react";
import {Provider} from "react-redux";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {fetchReducer, fetchStateType} from "../../redux/reducers/fetchReducer";
import thunk from "redux-thunk";
import {tasksStateType} from "../../pages/Todolists/Todolists";


type storeType = {
    tasks: tasksStateType,
    todolists: Array<TodolistType>,
    fetch: fetchStateType,
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
    ],
    fetch: {
        error: '',
        isFetching: false,
    }
}

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    fetch: fetchReducer,
})

const storyBookStore = createStore(rootReducer, initGlobalStore as AppRootStateType,applyMiddleware(thunk))

export const ReduxProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}