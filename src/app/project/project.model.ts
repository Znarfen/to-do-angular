import { Task } from "../task/task.model";
import { Date } from "../date.model";

export interface Project {
    name: string;
    description: string;
    deadline: Date;
    editMode: boolean;
    tasks: Task[];
}