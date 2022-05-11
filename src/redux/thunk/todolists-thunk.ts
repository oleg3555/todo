import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/api";
import {
    addTodolistAC, changeTodolistFetchStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    todolistActionsType
} from "../reducers/todolistReducer";
import {disableAppLoaderAC, enableAppLoaderAC, appStatusActionsType} from "../reducers/appStatusReducer";
import {handleAppError, handleServerError} from "./utils/errorHandlers";

export const setTodolistsTC = () => {
    return async (dispatch: Dispatch<todolistActionsType | appStatusActionsType>) => {
        dispatch(enableAppLoaderAC());
        try {
            const response = await todolistsAPI.getTodolists();
            dispatch(setTodolistsAC(response.data));
        } catch (error: any) {
            handleServerError(dispatch, error.message);
        }
        dispatch(disableAppLoaderAC());
    }
}

export const createTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<todolistActionsType | appStatusActionsType>) => {
        dispatch(enableAppLoaderAC());
        try {
            const response = await todolistsAPI.createTodolist(title);
            const {data} = response;
            if (!data.resultCode) {
                const {item} = data.data;
                dispatch(addTodolistAC(item));
            } else {
                handleAppError(dispatch, data);
            }
        } catch (error: any) {
            handleServerError(dispatch, error.message);
        }
        dispatch(disableAppLoaderAC());
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch<todolistActionsType | appStatusActionsType>) => {
        dispatch(changeTodolistFetchStatusAC(todolistId, 'removing'));
        try {
            const response = await todolistsAPI.removeTodolist(todolistId);
            const {data} = response;
            if (!data.resultCode) {
                dispatch(removeTodolistAC(todolistId));
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

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch<todolistActionsType | appStatusActionsType>) => {
        dispatch(changeTodolistFetchStatusAC(todolistId, 'updating'));
        try {
            const response = await todolistsAPI.updateTodolist(todolistId, title);
            const {data} = response;
            if (!data.resultCode) {
                dispatch(changeTodolistTitleAC(todolistId, title));
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