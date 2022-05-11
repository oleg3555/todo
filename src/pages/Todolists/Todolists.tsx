import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {changeTodolistFilterAC, filterType, TodolistType} from "../../redux/reducers/todolistReducer";
import React, {useCallback, useEffect} from "react";
import {
    changeTodolistTitleTC,
    createTodolistTC,
    removeTodolistTC,
    setTodolistsTC
} from "../../redux/thunk/todolists-thunk";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {apiTaskType} from "../../api/api";
import {itemFetchStatus} from "../../redux/reducers/taskReducer";

export type taskType = apiTaskType & {
    fetchStatus: itemFetchStatus
}

export type tasksStateType = {
    [key: string]: Array<taskType>,
}

export const Todolists = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

    useEffect(() => {
        dispatch(setTodolistsTC());
    }, [dispatch]);

    const changeTodolistFilter = useCallback((todoListId: string, value: filterType) => {
        dispatch(changeTodolistFilterAC(todoListId, value));
    }, [dispatch]);

    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodolistTC(todoListId));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title));
    }, [dispatch]);

    return <>
        <Grid container style={{padding: '1rem'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={6}>
            {todolists.map(todo =>
                <Grid item key={todo.id}>
                    <Paper style={{padding: '0.8rem'}}>
                        <Todolist id={todo.id}
                                  title={todo.title}
                                  filter={todo.filter}
                                  fetchStatus={todo.fetchStatus}
                                  removeTodolist={removeTodolist}
                                  changeTodolistFilter={changeTodolistFilter}
                                  changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            )}
        </Grid>
    </>
}