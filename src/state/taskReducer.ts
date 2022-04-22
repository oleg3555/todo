import {tasksStateType} from "../App";
import {addTodoType, removeTodoType, setTodolistsType} from "./todolistReducer";
import {TaskStatuses, taskType} from "../api/todolists-api";

type addTaskType = ReturnType<typeof addTaskAC>
type removeTaskType = ReturnType<typeof removeTaskAC>
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type setTasksType = ReturnType<typeof setTasksAC>

type actionType =
    addTaskType
    | removeTaskType
    | setTasksType
    | changeTaskTitleType
    | changeTaskStatusType
    | addTodoType
    | setTodolistsType
    | removeTodoType;


const initialState: tasksStateType = {};

export const taskReducer = (state: tasksStateType = initialState, action: actionType): tasksStateType => {
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
            return {...state, [todoListId]: tasks};
        }
        case 'ADD-TASK': {
            const {task} = action.payload;
            const updatedTasks = [task, ...state[task.todoListId]];
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
        default: {
            return state;
        }
    }
}

export const setTasksAC = (todoListId: string, tasks: Array<taskType>) => {
    return {type: 'SET-TASKS', payload: {todoListId, tasks}} as const;
}

export const addTaskAC = (task: taskType) => {
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