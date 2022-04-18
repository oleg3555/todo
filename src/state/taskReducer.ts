import {v1} from "uuid";
import {tasksStateType} from "../App";
import {addTodoType, removeTodoType} from "./todolistReducer";
import {TaskPriorities, TaskStatuses, taskType} from "../api/todolists-api";

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


const initialState: tasksStateType = {};

export const taskReducer = (state: tasksStateType = initialState, action: actionType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            const {todoListId, title} = action.payload;
            const newTask: taskType = {
                id: v1(), title, status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId,
            };
            const updatedTasks = [newTask, ...state[todoListId]];
            return {...state, [todoListId]: updatedTasks};
        }
        case 'REMOVE-TASK': {
            const {todoListId, taskId} = action.payload;
            const updatedTasks = state[todoListId].filter(item => item.id !== taskId);
            return {...state, [todoListId]: updatedTasks};
        }
        case 'CHANGE-TASK-TITLE': {
            const {todoListId, taskId, title} = action.payload;
            const updatedTasks = state[todoListId].map(item => item.id === taskId ? {...item, title} : item);
            return {...state, [todoListId]: updatedTasks};
        }
        case 'CHANGE-TASK-STATUS': {
            const {todoListId, taskId, status} = action.payload;
            const updatedTasks = state[todoListId].map(item => item.id === taskId ? {...item, status} : item);
            return {...state, [todoListId]: updatedTasks};
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

export const addTaskAC = (todoListId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todoListId, title}} as const;
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todoListId, taskId}} as const;
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todoListId, taskId, status}} as const;
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todoListId, taskId, title}} as const;
}