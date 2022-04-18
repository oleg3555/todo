import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, taskType} from "./api/todolists-api";

type propsType = {
    task: taskType,
    removeTask: (id: string) => void,
    changeTaskTitle: (id: string, title: string) => void,
    changeTaskStatus: (id: string, status: TaskStatuses) => void,
}

export const Task = React.memo((props: propsType) => {
    const {status, title, id} = props.task;

    const removeHandler = useCallback(() => {
        props.removeTask(id);
    }, [props.removeTask, id]);

    const changeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New);
    }, [props.changeTaskStatus, id]);

    const changeTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(id, title);
    }, [props.changeTaskTitle, id]);

    return (
        <div className={status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox checked={status === TaskStatuses.Completed} onChange={changeStatusHandler}/>
            <EditableSpan title={title} changeTitle={changeTitleHandler}/>
            <IconButton onClick={removeHandler}>
                <DeleteForeverIcon/>
            </IconButton>
        </div>
    )
})