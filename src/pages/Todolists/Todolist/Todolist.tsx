import React, {MouseEvent, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Button, CircularProgress, Grid, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {Task} from "./Task/Task";
import {filterType} from "../../../redux/reducers/todolistReducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    removeTaskTC,
    setTasksTC
} from "../../../redux/thunk/tasks-thunk";
import {taskType} from "../Todolists";
import {itemFetchStatus} from "../../../redux/reducers/taskReducer";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


type propsType = {
    id: string,
    title: string,
    fetchStatus: itemFetchStatus,
    changeTodolistFilter: (todolistId: string, value: filterType) => void,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, title: string) => void,
    filter: filterType,
}


export const Todolist = React.memo((props: propsType) => {
    const dispatch = useDispatch();
    const allTasks = useSelector<AppRootStateType, Array<taskType>>(state => state.tasks[props.id]);

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

    const getStatusItem = (status: itemFetchStatus) => {
        if (status === 'idle') {
            return (<IconButton onClick={removeTodolist}>
                <DeleteForeverIcon/>
            </IconButton>);
        } else if (status === 'failed') {
            return <ErrorOutlineIcon/>;
        } else {
            return <CircularProgress/>;
        }
    }

    return (
        <div className={(props.fetchStatus === 'failed' || props.fetchStatus === 'removing') ? 'disabled' : undefined}>
            <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                    <h3 className={props.fetchStatus === 'updating' ? 'disabled' : undefined}><EditableSpan
                        title={props.title} changeTitle={changeTodolistTitle}/></h3>
                </Grid>
                <Grid item>
                    {getStatusItem(props.fetchStatus)}
                </Grid>
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