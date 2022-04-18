import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, taskType, todolistsAPI, updatedTaskFields} from "../../api/todolists-api";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC} from "../taskReducer";

const getUpdatedFields = (title: string = '',
                          status: TaskStatuses = TaskStatuses.New,
                          priority: TaskPriorities = TaskPriorities.Low,
                          description: string = '',
                          startDate: string = '',
                          deadline: string = ''): updatedTaskFields => {
    return {
        title,
        description,
        status,
        priority,
        startDate,
        deadline,
    }
}


export const setTasksTC = (todolistId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await todolistsAPI.getTasks(todolistId);
            const {items} = response.data;
            dispatch(setTasksAC(todolistId, items));
        } catch (error) {
            console.error(error);
        }
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await todolistsAPI.addTask(todolistId, title);
            const {item} = response.data.data;
            dispatch(addTaskAC(todolistId, item.id, title));
        } catch (error) {
            console.error(error);
        }
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            await todolistsAPI.removeTask(todolistId, taskId);
            dispatch(removeTaskAC(todolistId, taskId));
        } catch (error) {
            console.error(error);
        }
    }
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return async (dispatch: Dispatch, getState: any) => {
        const {tasks} = getState();
        const task = tasks[todolistId].find((item: taskType) => item.id === taskId);
        try {
            const updatedFields = getUpdatedFields(task.title, status, task.priority, task.description, task.startDate, task.deadline);
            await todolistsAPI.updateTask(todolistId, taskId, updatedFields)
            dispatch(changeTaskStatusAC(todolistId, taskId, status));
        } catch (error) {
            console.log(error);
        }
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return async (dispatch: Dispatch, getState: any) => {
        const {tasks} = getState();
        const task = tasks[todolistId].find((item: taskType) => item.id === taskId);
        try {
            const updatedFields = getUpdatedFields(title, task.status, task.priority, task.description, task.startDate, task.deadline);
            await todolistsAPI.updateTask(todolistId, taskId, updatedFields)
            dispatch(changeTaskTitleAC(todolistId, taskId, title));
        } catch (error) {
            console.log(error);
        }
    }
}