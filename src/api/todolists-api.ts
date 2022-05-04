import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': String(process.env.REACT_APP_API_KEY),
    }
})

export type apiTodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,
}

export type apiTaskType = {
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
    description: string,
    title: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
}


export type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D,
}

type getTasksResponseType = {
    error: string | null,
    totalCount: number,
    items: Array<apiTaskType>,
}

type addTaskResponseType = ResponseType<{ item: apiTaskType }> & {
    fieldsErrors: Array<string>,
}

export type updatedTaskFields = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
}

type updateTaskResponseType = addTaskResponseType;

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<apiTodolistType>>('/todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: apiTodolistType }>>('/todo-lists', {title});
    },
    removeTodolist(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${id}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<getTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    addTask(todolistId: string, title: string) {
        return instance.post<addTaskResponseType>(`/todo-lists/${todolistId}/tasks`, {title});
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, data: updatedTaskFields) {
        return instance.put<updateTaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, data);
    }
}