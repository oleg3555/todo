import React, {useCallback} from 'react';
import './App.css';
import {filterType, taskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistReducer";

export type todolistType = {
    id: string,
    title: string,
    filter: filterType,
}

export type tasksStateType = {
    [key: string]: Array<taskType>,
}

function App() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<todolistType>>(state => state.todolists);


    const changeTodolistFilter = useCallback((todolistId: string, value: filterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, [dispatch]);


    return (
        <div className="App">
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
