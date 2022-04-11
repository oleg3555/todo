import React, {MouseEvent, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Button, Grid, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReducer";
import {Task} from "./Task";

export type taskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type filterType = 'all' | 'active' | 'completed';

type propsType = {
    id: string,
    title: string,
    changeTodolistFilter: (todolistId: string, value: filterType) => void,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, title: string) => void,
    filter: filterType,
}


export const Todolist = React.memo((props: propsType) => {
    const dispatch = useDispatch();
    const allTasks = useSelector<AppRootStateType, Array<taskType>>(state => state.tasks[props.id]);

    let tasks = allTasks;
    if (props.filter === 'active') {
        tasks = allTasks.filter(task => !task.isDone)
    } else if (props.filter === 'completed') {
        tasks = allTasks.filter(task => task.isDone);
    }

    const changeTodolistFilter = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const {dataset} = event.target as HTMLButtonElement;
        props.changeTodolistFilter(props.id, dataset.id as filterType);
    }, [props.changeTodolistFilter, props.id]);

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title));
    }, [dispatch, props.id]);

    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(props.id, taskId));
    }, [dispatch, props.id]);

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(props.id, taskId, title));
    }, [dispatch, props.id]);

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.id, taskId, isDone));
    }, [dispatch, props.id]);

    return (
        <div>
            <Grid container>
                <h3><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/></h3>
                <IconButton onClick={removeTodolist}>
                    <DeleteForeverIcon/>
                </IconButton>
            </Grid>
            <div style={{margin: '0.5rem 0'}}>
                <AddItemForm addItem={addTask}/>
            </div>
            {tasks.map(task => <Task key={task.id}
                                     task={task}
                                     removeTask={removeTask}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTaskStatus={changeTaskStatus}/>)}
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} color={'inherit'} data-id='all'
                        onClick={changeTodolistFilter}>
                    All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'} color={'primary'} data-id='active'
                        onClick={changeTodolistFilter}>
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color={'error'}
                        data-id='completed' onClick={changeTodolistFilter}>
                    Completed
                </Button>
            </div>
        </div>
    )
})