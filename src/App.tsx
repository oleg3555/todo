import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTodolistFilterAC, filterType, TodolistType} from "./state/todolistReducer";
import {taskType} from "./api/todolists-api";
import {changeTodolistTitleTC, createTodolistTC, removeTodolistTC, setTodolistsTC} from "./state/thunk/todolists-thunk";
import {fetchStateType} from "./state/fetchReducer";
import {Loading} from "./loader/Loading";

export type tasksStateType = {
    [key: string]: Array<taskType>,
}

function App() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const {isFetching} = useSelector<AppRootStateType, fetchStateType>(state => state.fetch);

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


    return (
        <div className="App">
            {isFetching && <Loading/>}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
            </Container>
        </div>
    );
}

export default App;
