import {Dispatch} from "redux";
import {TaskStatuses, todolistsAPI} from "../../api/api";
import {
    addTaskAC, changeTaskFetchStatusAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    taskActionsType
} from "../reducers/taskReducer";
import {AppRootStateType} from "../store";
import {appStatusActionsType, setAppErrorAC} from "../reducers/appStatusReducer";
import {taskType} from "../../pages/Todolists/Todolists";
import {handleAppError, handleServerError} from "./utils/errorHandlers";
import {changeTodolistFetchStatusAC, todolistActionsType} from "../reducers/todolistReducer";

export const setTasksTC = (todolistId: string) => {
    return async (dispatch: Dispatch<taskActionsType | appStatusActionsType | todolistActionsType>) => {
        dispatch(changeTodolistFetchStatusAC(todolistId, 'updating'));
        try {
            const {data: {error, items}} = await todolistsAPI.getTasks(todolistId);
            if (!error) {
                dispatch(setTasksAC(todolistId, items));
                dispatch(changeTodolistFetchStatusAC(todolistId, 'idle'));
            } else {
                dispatch(setAppErrorAC(error));
                dispatch(changeTodolistFetchStatusAC(todolistId, 'failed'));
            }
        } catch (error: any) {
            dispatch(changeTodolistFetchStatusAC(todolistId, 'failed'));
            handleServerError(dispatch, error.message);
        }
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch<taskActionsType | appStatusActionsType | todolistActionsType>) => {
        dispatch(changeTodolistFetchStatusAC(todolistId, 'updating'));
        try {
            const {data} = await todolistsAPI.addTask(todolistId, title);
            if (!data.resultCode) {
                dispatch(addTaskAC(data.data.item));
                dispatch(changeTodolistFetchStatusAC(todolistId, 'idle'));
            } else {
                dispatch(changeTodolistFetchStatusAC(todolistId, 'failed'));
                handleAppError(dispatch, data);
            }
        } catch (error: any) {
            dispatch(changeTodolistFetchStatusAC(todolistId, 'failed'));
            handleServerError(dispatch, error.message);
        }
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return async (dispatch: Dispatch<taskActionsType | appStatusActionsType>) => {
        dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'removing'));
        try {
            const {data} = await todolistsAPI.removeTask(todolistId, taskId);
            if (!data.resultCode) {
                dispatch(removeTaskAC(todolistId, taskId));
            } else {
                dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'failed'));
                handleAppError(dispatch, data);
            }
        } catch (error: any) {
            dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'failed'));
            handleServerError(dispatch, error.message);
        }
    }
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return async (dispatch: Dispatch<taskActionsType | appStatusActionsType>, getState: () => AppRootStateType) => {
        dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'updating'));
        const {tasks} = getState();
        const task = tasks[todolistId].find((item: taskType) => item.id === taskId);
        if (!task) {
            console.warn('Task is not found');
            dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'failed'));
            return;
        }
        try {
            const {data} = await todolistsAPI.updateTask(todolistId, taskId, {...task, status});
            if (!data.resultCode) {
                dispatch(changeTaskStatusAC(todolistId, taskId, status));
            } else {
                handleAppError(dispatch, data);
            }
            dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'idle'));
        } catch (error: any) {
            dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'failed'));
            handleServerError(dispatch, error.message);
        }
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return async (dispatch: Dispatch<taskActionsType | appStatusActionsType>, getState: () => AppRootStateType) => {
        dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'updating'));
        const {tasks} = getState();
        const task = tasks[todolistId].find((item: taskType) => item.id === taskId);
        if (!task) {
            dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'failed'));
            console.warn('Task is not found');
            return;
        }
        try {
            const {data} = await todolistsAPI.updateTask(todolistId, taskId, {...task, title});
            if (!data.resultCode) {
                dispatch(changeTaskTitleAC(todolistId, taskId, title));
            } else {
                handleAppError(dispatch, data);
            }
            dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'idle'));
        } catch (error: any) {
            dispatch(changeTaskFetchStatusAC(todolistId, taskId, 'failed'));
            handleServerError(dispatch, error.message);
        }
    }
}