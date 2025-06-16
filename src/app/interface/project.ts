import { Task } from "./task";

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