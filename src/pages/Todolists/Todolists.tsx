import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {changeTodolistFilterAC, filterType, TodolistType} from "../../redux/reducers/todolistReducer";
import {appStatusStateType} from "../../redux/reducers/appStatusReducer";
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
import {apiTaskType} from "../../api/todolists-api";
import {Loading} from "../../loader/Loading";
import {taskFetchStatus} from "../../redux/reducers/taskReducer";

export type taskType = apiTaskType & {
    fetchStatus: taskFetchStatus
}

export type tasksStateType = {
    [key: string]: Array<taskType>,
}


export function Todolists() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const {isFetching} = useSelector<AppRootStateType, appStatusStateType>(state => state.app);

    useEffect(() => {
        dispatch(setTodolistsTC());
    }, []);

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
        {isFetching && <Loading/>}
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