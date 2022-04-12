import {todolistType} from "../App";
import {v1} from "uuid";
import {filterType} from "../Todolist";

export type addTodoType = ReturnType<typeof addTodolistAC>
type changeTodoFilterType = ReturnType<typeof changeTodolistFilterAC>
export type removeTodoType = ReturnType<typeof removeTodolistAC>
type changeTodoTitleType = ReturnType<typeof changeTodolistTitleAC>

type actionType = addTodoType | changeTodoFilterType | removeTodoType | changeTodoTitleType;

const initialState: Array<todolistType> = [];

export const todolistReducer = (state: Array<todolistType> = initialState, action: actionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const {id, title} = action.payload;
            const newTodolist: todolistType = {id, title, filter: 'all'};
            return [...state, newTodolist];
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


export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', payload: {id: v1(), title}} as const;
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