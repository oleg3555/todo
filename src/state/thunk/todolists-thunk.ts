import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/todolists-api";
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../todolistReducer";
import {disableLoaderAC, enableLoaderAC} from "../fetchReducer";

export const setTodolistsTC = () => {
    return async (dispatch: Dispatch) => {
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
    return async (dispatch: Dispatch) => {
        dispatch(enableLoaderAC());
        try {
            const response = await todolistsAPI.createTodolist(title);
            const {item} = response.data.data;
            dispatch(addTodolistAC(item.id, title));
        } catch (error) {
            console.error(error);
        }
        dispatch(disableLoaderAC());
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch) => {
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
    return async (dispatch: Dispatch) => {
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