import React, {MouseEvent, useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Button, Grid, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Task} from "./Task";
import {filterType} from "./state/todolistReducer";
import {TaskStatuses, taskType} from "./api/todolists-api";
import {fetchStateType} from "./state/fetchReducer";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC, setTasksTC} from "./state/thunk/tasks-thunk";
import {Loading} from "./loader/Loading";


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
    const {isFetching} = useSelector<AppRootStateType, fetchStateType>(state => state.fetch);

    useEffect(() => {
        dispatch(setTasksTC(props.id));
    }, [])

    let tasks = allTasks;
    if (props.filter === 'active') {
        tasks = allTasks.filter(task => task.status !== TaskStatuses.Completed);
    } else if (props.filter === 'completed') {
        tasks = allTasks.filter(task => task.status === TaskStatuses.Completed);
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
        dispatch(addTaskTC(props.id, title));
    }, [dispatch, props.id]);

    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskTC(props.id, taskId));
    }, [dispatch, props.id]);

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(changeTaskTitleTC(props.id, taskId, title));
    }, [dispatch, props.id]);

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(props.id, taskId, status));
    }, [dispatch, props.id]);

    return (
        <div>
            {isFetching && <Loading/>}
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