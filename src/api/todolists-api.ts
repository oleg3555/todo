import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': String(process.env.REACT_APP_API_KEY),
    }
})

export type todolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export type taskType = {
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
    description: string | null,
    title: string,
    status: number,
    priority: number,
    startDate: string | null,
    deadline: string | null,
}


type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D,
}

type getTasksResponseType = {
    error: string | null,
    totalCount: number,
    items: Array<taskType>,
}

type addTaskResponseType = ResponseType<{ item: taskType }> & {
    fieldsErrors: Array<string>,
}

type updatedTaskFields = {
    title: string,
    description: string | null,
    status: number,
    priority: number,
    startDate: string | null,
    deadline: string | null,
}

type updateTaskResponseType = addTaskResponseType;

export const todolistsAPI = {
    async getTodolists() {
        return await instance.get<Array<todolistType>>('/todo-lists');
    },
    async createTodolist(title: string) {
        return await instance.post<ResponseType<{ item: todolistType }>>('/todo-lists', {title});
    },
    async removeTodolist(id: string) {
        return await instance.delete<ResponseType>(`/todo-lists/${id}`);
    },
    async updateTodolist(id: string, title: string) {
        return await instance.put<ResponseType>(`/todo-lists/${id}`, {title});
    },
    async getTasks(todolistId: string) {
        return await instance.get<getTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    async addTask(todolistId: string, title: string) {
        return await instance.post<addTaskResponseType>(`/todo-lists/${todolistId}/tasks`, {title});
    },
    async removeTask(todolistId: string, taskId: string) {
        return await instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    async updateTask(todolistId: string, taskId: string, data: updatedTaskFields) {
        return await instance.put<updateTaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, data);
    }
}