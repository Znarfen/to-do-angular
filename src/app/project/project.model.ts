import { Task } from "../task/task.model";

export interface Project {
    name: string;
    description: string;
    deadline: {
        d: number;
        m: number;
        y: number;
    }
    tasks: Task[];
}