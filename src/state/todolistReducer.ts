import {apiTodolistType} from "../api/todolists-api";

export type addTodoType = ReturnType<typeof addTodolistAC>
type changeTodoFilterType = ReturnType<typeof changeTodolistFilterAC>
export type removeTodoType = ReturnType<typeof removeTodolistAC>
type changeTodoTitleType = ReturnType<typeof changeTodolistTitleAC>
export type setTodolistsType = ReturnType<typeof setTodolistsAC>

type actionType = addTodoType | changeTodoFilterType | removeTodoType | changeTodoTitleType | setTodolistsType;


export type filterType = 'all' | 'active' | 'completed';
export type TodolistType = apiTodolistType & {
    filter: filterType,
}

const initialState: Array<TodolistType> = [];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: actionType): Array<TodolistType> => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}));
        }
        case 'ADD-TODOLIST': {
            const {todolist} = action.payload;
            const newTodolist: TodolistType = {...todolist, filter: 'all'};
            return [newTodolist, ...state];
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