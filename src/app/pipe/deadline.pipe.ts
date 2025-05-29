import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../project/project.model";
import { Task } from "../task/task.model";

@Pipe({
    name: 'deadline'
})

export class deadlinePipe implements PipeTransform {
    transform(pt: Project | Task): string {
        return pt.deadline.d + " / " + pt.deadline.m + " / " + pt.deadline.y
    }
}