import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "../reducers/taskReducer";
import {TaskPriorities, TaskStatuses, apiTaskType} from "../../api/api";
import {tasksStateType, taskType} from "../../pages/Todolists/Todolists";

const testTaskId = v1();

const startState: tasksStateType = {
    ["tl1"]: [
        {
            id: v1(), title: "JS", status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl1',
            fetchStatus: 'idle',
        },
        {
            id: testTaskId, title: "React", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl1',
            fetchStatus: 'idle',
        },
        {
            id: v1(), title: "Git", status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl1',
            fetchStatus: 'idle',
        }
    ],
    ["tl2"]: [
        {
            id: v1(), title: "Bread", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl2',
            fetchStatus: 'idle',
        },
        {
            id: v1(), title: "Milk", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl2',
            fetchStatus: 'idle',
        },
        {
            id: v1(), title: "Fish", status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl2',
            fetchStatus: 'idle',
        }
    ]
}

test("new task should be added", () => {
    const task: taskType = {
        id: '1',
        title: 'Beer',
        todoListId: 'tl2',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        status: TaskStatuses.New,
        fetchStatus:'idle',
    };
    const endState = taskReducer(startState, addTaskAC(task));
    expect(endState["tl2"][0].status).toBe(TaskStatuses.New);
    expect(endState["tl2"][0].title).toBe("Beer");
    expect(endState["tl1"][1].status).toBe(TaskStatuses.New);
})

test("correct task should be removed", () => {
    const endState = taskReducer(startState, removeTaskAC("tl1", testTaskId));
    expect(endState["tl1"].length).toBe(2);
    expect(endState["tl2"].length).toBe(3);
    expect(endState["tl1"][1].title).toBe("Git");

})

test("correct task should change status", () => {
    const endState = taskReducer(startState, changeTaskStatusAC("tl1", testTaskId, TaskStatuses.Completed));
    expect(endState["tl1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["tl1"].length).toBe(3);
    expect(endState["tl2"].length).toBe(3);
})

test("correct task should change title", () => {
    const endState = taskReducer(startState, changeTaskTitleAC("tl1", testTaskId, "Gitlab"));
    expect(endState["tl1"][1].title).toBe("Gitlab");
    expect(endState["tl1"].length).toBe(3);
    expect(endState["tl2"].length).toBe(3);
})