import {Checkbox, CircularProgress, Grid, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, {ChangeEvent, useCallback} from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {TaskStatuses} from "../../../../api/api";
import {taskType} from "../../Todolists";
import {itemFetchStatus} from "../../../../redux/reducers/taskReducer";

type propsType = {
    task: taskType,
    removeTask: (id: string) => void,
    changeTaskTitle: (id: string, title: string) => void,
    changeTaskStatus: (id: string, status: TaskStatuses) => void,
}

export const Task = React.memo((props: propsType) => {
    const {status, title, id, fetchStatus} = props.task;

    const removeHandler = useCallback(() => {
        props.removeTask(id);
    }, [props.removeTask, id]);

    const changeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New);
    }, [props.changeTaskStatus, id]);

    const changeTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(id, title);
    }, [props.changeTaskTitle, id]);

    const getStatusItem = (type: itemFetchStatus) => {
        if (type === 'idle') {
            return <Checkbox checked={status === TaskStatuses.Completed} onChange={changeStatusHandler}/>;
        } else if (type === 'failed') {
            return <ErrorOutlineIcon/>;
        } else {
            return <CircularProgress/>;
        }
    }

    return (
        <div>
            <Grid
                container
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={2}>
                    {getStatusItem(fetchStatus)}
                </Grid>
                <Grid item className={fetchStatus !== 'idle' ? 'disabled' : undefined}>
                    <EditableSpan title={title} changeTitle={changeTitleHandler}/>
                    <IconButton onClick={removeHandler}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
})

