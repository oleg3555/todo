import {Dispatch} from "redux";
import {TaskStatuses, taskType, todolistsAPI} from "../../api/todolists-api";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC} from "../taskReducer";
import {AppRootStateType} from "../store";


export const setTasksTC = (todolistId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await todolistsAPI.getTasks(todolistId);
            const {items} = response.data;
            dispatch(setTasksAC(todolistId, items));
        } catch (error) {
            console.error(error);
        }
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await todolistsAPI.addTask(todolistId, title);
            const {item} = response.data.data;
            dispatch(addTaskAC(item));
        } catch (error) {
            console.error(error);
        }
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            await todolistsAPI.removeTask(todolistId, taskId);
            dispatch(removeTaskAC(todolistId, taskId));
        } catch (error) {
            console.error(error);
        }
    }
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return async (dispatch: Dispatch, getState: ()=>AppRootStateType) => {
        const {tasks} = getState();
        const task = tasks[todolistId].find((item: taskType) => item.id === taskId);
        if(!task){
            console.warn('Task is not found');
            return;
        }
        try {
            await todolistsAPI.updateTask(todolistId, taskId, {...task, status});
            dispatch(changeTaskStatusAC(todolistId, taskId, status));
        } catch (error) {
            console.log(error);
        }
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return async (dispatch: Dispatch, getState: ()=>AppRootStateType) => {
        const {tasks} = getState();
        const task = tasks[todolistId].find((item: taskType) => item.id === taskId);
        if(!task){
            console.warn('Task is not found');
            return;
        }
        try {
            await todolistsAPI.updateTask(todolistId, taskId, {...task, title});
            dispatch(changeTaskTitleAC(todolistId, taskId, title));
        } catch (error) {
            console.log(error);
        }
    }
}