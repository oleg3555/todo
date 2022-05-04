import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/todolists-api";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    todolistActionsType
} from "../reducers/todolistReducer";
import {disableAppLoaderAC, enableAppLoaderAC, appStatusActionsType} from "../reducers/appStatusReducer";

export const setTodolistsTC = () => {
    return async (dispatch: Dispatch<todolistActionsType | appStatusActionsType>) => {
        dispatch(enableAppLoaderAC());
        try {
            const response = await todolistsAPI.getTodolists();
            dispatch(setTodolistsAC(response.data));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableAppLoaderAC());
    }
}

export const createTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<todolistActionsType | appStatusActionsType>) => {
        dispatch(enableAppLoaderAC());
        try {
            const response = await todolistsAPI.createTodolist(title);
            const {item} = response.data.data;
            dispatch(addTodolistAC(item));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableAppLoaderAC());
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch<todolistActionsType | appStatusActionsType>) => {
        dispatch(enableAppLoaderAC());
        try {
            await todolistsAPI.removeTodolist(todolistId);
            dispatch(removeTodolistAC(todolistId));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableAppLoaderAC());
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch<todolistActionsType | appStatusActionsType>) => {
        dispatch(enableAppLoaderAC());
        try {
            await todolistsAPI.updateTodolist(todolistId, title);
            dispatch(changeTodolistTitleAC(todolistId, title));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableAppLoaderAC());
    }
}