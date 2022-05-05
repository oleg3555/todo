import {addTodoType, removeTodoType, setTodolistsType} from "./todolistReducer";
import {apiTaskType, TaskStatuses} from "../../api/todolists-api";
import {tasksStateType, taskType} from "../../pages/Todolists/Todolists";

type addTaskType = ReturnType<typeof addTaskAC>
type removeTaskType = ReturnType<typeof removeTaskAC>
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type setTasksType = ReturnType<typeof setTasksAC>
type changeTaskFetchStatus = ReturnType<typeof changeTaskFetchStatusAC>
export type itemFetchStatus = 'updating' | 'removing' | 'idle' | 'failed';

export type taskActionsType =
    addTaskType
    | removeTaskType
    | setTasksType
    | changeTaskTitleType
    | changeTaskStatusType
    | addTodoType
    | changeTaskFetchStatus
    | setTodolistsType
    | removeTodoType;


const initialState: tasksStateType = {};

export const taskReducer = (state: tasksStateType = initialState, action: taskActionsType): tasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const {todolists} = action.payload;
            const copyState = {...state};
            todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        }
        case "SET-TASKS": {
            const {tasks, todoListId} = action.payload;
            return {...state, [todoListId]: tasks.map(task => ({...task, fetchStatus: 'idle'}))};
        }
        case 'ADD-TASK': {
            const {task} = action.payload;
            const updatedTasks: Array<taskType> = [{...task, fetchStatus: 'idle'}, ...state[task.todoListId]];
            return {...state, [task.todoListId]: updatedTasks};
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
            const {todolist} = action.payload;
            return {...state, [todolist.id]: []};
        }
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload;
            const copyState = {...state};
            delete copyState[id];
            return copyState;
        }
        case "CHANGE-TASK-FETCH-STATUS": {
            const {todoListId, taskId, fetchStatus} = action.payload;
            const updatedTasks = state[todoListId].map(item => item.id === taskId ? {...item, fetchStatus} : item);
            return {...state, [todoListId]: updatedTasks};
        }
        default: {
            return state;
        }
    }
}


export const changeTaskFetchStatusAC = (todoListId: string, taskId: string, fetchStatus: itemFetchStatus) => {
    return {type: 'CHANGE-TASK-FETCH-STATUS', payload: {todoListId, taskId, fetchStatus}} as const;
}

export const setTasksAC = (todoListId: string, tasks: Array<apiTaskType>) => {
    return {type: 'SET-TASKS', payload: {todoListId, tasks}} as const;
}

export const addTaskAC = (task: apiTaskType) => {
    return {type: 'ADD-TASK', payload: {task}} as const;
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