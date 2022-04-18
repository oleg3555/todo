import React from 'react';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: 'Task',
    component: Task,
}

const task1 = {
    id: '1', title: 'TypeScript', status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: TaskPriorities.High,
    startDate: '',
    todoListId: '11',
}
const task2 = {
    id: '2', title: 'React', status: TaskStatuses.Completed,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: TaskPriorities.High,
    startDate: '',
    todoListId: '22',
}

const removeTaskCallback = action('Task removed');
const changeTaskTitle = action('Title changed');
const changeTaskStatus = action('Status changed');


export const TaskBaseExample = () => {
    return <>
        <Task task={task1} removeTask={removeTaskCallback} changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}/>
        <Task task={task2} removeTask={removeTaskCallback} changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}/>
    </>
}