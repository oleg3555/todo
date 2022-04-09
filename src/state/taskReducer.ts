import {v1} from "uuid";
import {tasksStateType} from "../App";
import {addTodoType, removeTodoType, todolistId1, todolistId2} from "./todolistReducer";

type addTaskType = ReturnType<typeof addTaskAC>
type removeTaskType = ReturnType<typeof removeTaskAC>
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

type actionType =
    addTaskType
    | removeTaskType
    | changeTaskTitleType
    | changeTaskStatusType
    | addTodoType
    | removeTodoType;


const initialState: tasksStateType = {
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
}

export const taskReducer = (state: tasksStateType = initialState, action: actionType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            const {todolistId, title} = action.payload;
            const newTask = {id: v1(), title, isDone: false};
            const updatedTasks = [newTask, ...state[todolistId]];
            return {...state, [todolistId]: updatedTasks};
        }
        case 'REMOVE-TASK': {
            const {todolistId, taskId} = action.payload;
            const updatedTasks = state[todolistId].filter(item => item.id !== taskId);
            return {...state, [todolistId]: updatedTasks};
        }
        case 'CHANGE-TASK-TITLE': {
            const {todolistId, taskId, title} = action.payload;
            const updatedTasks = state[todolistId].map(item => item.id === taskId ? {...item, title} : item);
            return {...state, [todolistId]: updatedTasks};
        }
        case 'CHANGE-TASK-STATUS': {
            const {todolistId, taskId, isDone} = action.payload;
            const updatedTasks = state[todolistId].map(item => item.id === taskId ? {...item, isDone} : item);
            return {...state, [todolistId]: updatedTasks};
        }
        case 'ADD-TODOLIST': {
            const {id} = action.payload;
            return {...state, [id]: []};
        }
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload;
            const copyState = {...state};
            delete copyState[id];
            return copyState;
        }
        default: {
            return state;
        }
    }
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const;
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const;
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}} as const;
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const;
}