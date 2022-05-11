import {apiTodolistType} from "../../api/api";
import {clearDataType, itemFetchStatus} from "./taskReducer";

export type addTodoType = ReturnType<typeof addTodolistAC>
type changeTodoFilterType = ReturnType<typeof changeTodolistFilterAC>
export type removeTodoType = ReturnType<typeof removeTodolistAC>
type changeTodoTitleType = ReturnType<typeof changeTodolistTitleAC>
export type setTodolistsType = ReturnType<typeof setTodolistsAC>
type changeTodolistFetchStatus = ReturnType<typeof changeTodolistFetchStatusAC>

export type todolistActionsType =
    addTodoType
    | changeTodoFilterType
    | clearDataType
    | removeTodoType
    | changeTodolistFetchStatus
    | changeTodoTitleType
    | setTodolistsType;


export type filterType = 'all' | 'active' | 'completed';
export type TodolistType = apiTodolistType & {
    filter: filterType,
    fetchStatus: itemFetchStatus,
}

const initialState: Array<TodolistType> = [];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: todolistActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const {todolists} = action.payload
            return todolists.map(tl => ({...tl, filter: 'all', fetchStatus: 'idle'}));
        }
        case 'ADD-TODOLIST': {
            const {todolist} = action.payload;
            return [{...todolist, filter: 'all', fetchStatus: 'idle'}, ...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const {id, filter} = action.payload;
            return state.map(item => item.id === id ? {...item, filter} : item);
        }
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload;
            return state.filter(item => item.id !== id);
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const {id, title} = action.payload;
            return state.map(item => item.id === id ? {...item, title} : item);
        }
        case "CHANGE-TODOLIST-FETCH-STATUS": {
            const {id, fetchStatus} = action.payload;
            return state.map(item => item.id === id ? {...item, fetchStatus} : item);
        }
        case "CLEAR-DATA": {
            return [];
        }
        default: {
            return state;
        }
    }
}


export const setTodolistsAC = (todolists: Array<apiTodolistType>) => {
    return {type: 'SET-TODOLISTS', payload: {todolists}} as const;
}

export const addTodolistAC = (todolist: apiTodolistType) => {
    return {type: 'ADD-TODOLIST', payload: {todolist}} as const;
}

export const changeTodolistFilterAC = (id: string, filter: filterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const;
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const;
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const;
}

export const changeTodolistFetchStatusAC = (id: string, fetchStatus: itemFetchStatus) => {
    return {type: 'CHANGE-TODOLIST-FETCH-STATUS', payload: {id, fetchStatus}} as const;
}