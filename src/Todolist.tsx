import React, {ChangeEvent, MouseEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Button, Checkbox, Grid, IconButton} from "@mui/material";

export type taskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type filterType = 'all' | 'active' | 'completed';

type propsType = {
    id: string,
    title: string,
    tasks: Array<taskType>
    removeTask: (todolistId: string, taskId: string) => void,
    changeFilter: (todolistId: string, value: filterType) => void,
    addTask: (todolistId: string, title: string) => void,
    removeTodolist: (todolistId: string) => void,
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void,
    changeTaskStatus: (todolistId: string, taskId: string, value: boolean) => void,
    filter: filterType,
}


export function Todolist(props: propsType) {

    const changeFilterHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const {dataset} = event.target as HTMLButtonElement;
        props.changeFilter(props.id, dataset.id as filterType);
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title);
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id);
    }

    return (
        <div>
            <Grid container>
                <h3>{props.title}</h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </Grid>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {props.tasks.map(task => {
                const removeTask = () => props.removeTask(props.id, task.id);

                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(props.id, task.id, title)
                }
                const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.id, task.id, event.currentTarget.checked);
                }

                return (
                    <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                        <IconButton onClick={removeTask}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </div>)
            })}
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} color={'inherit'} data-id='all'
                        onClick={changeFilterHandler}>
                    All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'} color={'primary'} data-id='active'
                        onClick={changeFilterHandler}>
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color={'error'}
                        data-id='completed' onClick={changeFilterHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )
}