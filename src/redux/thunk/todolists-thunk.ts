import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/todolists-api";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    todolistActionsType
} from "../reducers/todolistReducer";
import {disableLoaderAC, enableLoaderAC, fetchActionsType} from "../reducers/fetchReducer";

export const setTodolistsTC = () => {
    return async (dispatch: Dispatch<todolistActionsType | fetchActionsType>) => {
        dispatch(enableLoaderAC());
        try {
            const response = await todolistsAPI.getTodolists();
            dispatch(setTodolistsAC(response.data));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableLoaderAC());
    }
}

export const createTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<todolistActionsType | fetchActionsType>) => {
        dispatch(enableLoaderAC());
        try {
            const response = await todolistsAPI.createTodolist(title);
            const {item} = response.data.data;
            dispatch(addTodolistAC(item));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableLoaderAC());
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch<todolistActionsType | fetchActionsType>) => {
        dispatch(enableLoaderAC());
        try {
            await todolistsAPI.removeTodolist(todolistId);
            dispatch(removeTodolistAC(todolistId));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableLoaderAC());
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch<todolistActionsType | fetchActionsType>) => {
        dispatch(enableLoaderAC());
        try {
            await todolistsAPI.updateTodolist(todolistId, title);
            dispatch(changeTodolistTitleAC(todolistId, title));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableLoaderAC());
    }
}