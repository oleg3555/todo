import {Dispatch} from "redux";
import {TaskStatuses, taskType, todolistsAPI} from "../../api/todolists-api";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    taskActionsType
} from "../reducers/taskReducer";
import {AppRootStateType} from "../store";
import {fetchActionsType, setErrorAC} from "../reducers/fetchReducer";

const defaultErrorMessage: string = 'Something went wrong!';

export const setTasksTC = (todolistId: string) => {
    return async (dispatch: Dispatch<taskActionsType | fetchActionsType>) => {
        try {
            const response = await todolistsAPI.getTasks(todolistId);
            const {data} = response;
            if (!data.error) {
                const {items} = response.data;
                dispatch(setTasksAC(todolistId, items));
            } else {
                dispatch(setErrorAC(data.error));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch<taskActionsType | fetchActionsType>) => {
        try {
            const response = await todolistsAPI.addTask(todolistId, title);
            const {data} = response;
            if (!data.resultCode) {
                const {item} = data.data;
                dispatch(addTaskAC(item));
            } else {
                if (data.messages.length) {
                    dispatch(setErrorAC(data.messages[0]));
                } else {
                    dispatch(setErrorAC(defaultErrorMessage));
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return async (dispatch: Dispatch<taskActionsType | fetchActionsType>) => {
        try {
            const response = await todolistsAPI.removeTask(todolistId, taskId);
            const {data} = response;
            if (!data.resultCode) {
                dispatch(removeTaskAC(todolistId, taskId));
            } else {
                if (data.messages.length) {
                    dispatch(setErrorAC(data.messages[0]));
                } else {
                    dispatch(setErrorAC(defaultErrorMessage));
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return async (dispatch: Dispatch<taskActionsType | fetchActionsType>, getState: () => AppRootStateType) => {
        const {tasks} = getState();
        const task = tasks[todolistId].find((item: taskType) => item.id === taskId);
        if (!task) {
            console.warn('Task is not found');
            return;
        }
        try {
            const response = await todolistsAPI.updateTask(todolistId, taskId, {...task, status});
            const {data} = response;
            if (!data.resultCode) {
                dispatch(changeTaskStatusAC(todolistId, taskId, status));
            } else {
                if (data.messages.length) {
                    dispatch(setErrorAC(data.messages[0]));
                } else {
                    dispatch(setErrorAC(defaultErrorMessage));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return async (dispatch: Dispatch<taskActionsType | fetchActionsType>, getState: () => AppRootStateType) => {
        const {tasks} = getState();
        const task = tasks[todolistId].find((item: taskType) => item.id === taskId);
        if (!task) {
            console.warn('Task is not found');
            return;
        }
        try {
            const response = await todolistsAPI.updateTask(todolistId, taskId, {...task, title});
            const {data} = response;
            if (!data.resultCode) {
                dispatch(changeTaskTitleAC(todolistId, taskId, title));
            } else {
                if (data.messages.length) {
                    dispatch(setErrorAC(data.messages[0]));
                } else {
                    dispatch(setErrorAC(defaultErrorMessage));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}