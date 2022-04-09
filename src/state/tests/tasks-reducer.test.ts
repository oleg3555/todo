import {v1} from "uuid";
import {tasksStateType} from "../../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "../taskReducer";

test("new task should be added", () => {
    const startState: tasksStateType = {
        ["tl1"]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Git", isDone: true}
        ],
        ["tl2"]: [
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Fish", isDone: true}
        ]
    }

    const endState = taskReducer(startState, addTaskAC("tl2", "Beer"));
    expect(endState["tl2"][0].isDone).toBe(false);
    expect(endState["tl2"][0].title).toBe("Beer");
    expect(endState["tl1"][1].isDone).toBe(false);
})

test("correct task should be removed", () => {
    const taskId: string = v1();
    const startState: tasksStateType = {
        ["tl1"]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Git", isDone: true}
        ],
        ["tl2"]: [
            {id: v1(), title: "Bread", isDone: false},
            {id: taskId, title: "Milk", isDone: false},
            {id: v1(), title: "Fish", isDone: true}
        ]
    }

    const endState = taskReducer(startState, removeTaskAC( "tl2",taskId));
    expect(endState["tl2"].length).toBe(2);
    expect(endState["tl1"].length).toBe(3);
    expect(endState["tl2"][1].title).toBe("Fish");

})

test("correct task should change status", () => {
    const taskId: string = v1();
    const startState: tasksStateType = {
        ["tl1"]: [
            {id: v1(), title: "JS", isDone: true},
            {id: taskId, title: "React", isDone: false},
            {id: v1(), title: "Git", isDone: true}
        ],
        ["tl2"]: [
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Fish", isDone: true}
        ]
    }

    const endState = taskReducer(startState, changeTaskStatusAC( "tl1",taskId, true));
    expect(endState["tl1"][1].isDone).toBe(true);
    expect(endState["tl1"].length).toBe(3);
    expect(endState["tl2"].length).toBe(3);
})

test("correct task should change title", () => {
    const taskId: string = v1();
    const startState: tasksStateType = {
        ["tl1"]: [
            {id: v1(), title: "JS", isDone: true},
            {id: taskId, title: "React", isDone: false},
            {id: v1(), title: "Git", isDone: true}
        ],
        ["tl2"]: [
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Fish", isDone: true}
        ]
    }

    const endState = taskReducer(startState, changeTaskTitleAC("tl1", taskId, "Gitlab"));
    expect(endState["tl1"][1].title).toBe("Gitlab");
    expect(endState["tl1"].length).toBe(3);
    expect(endState["tl2"].length).toBe(3);
})