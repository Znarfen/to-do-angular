import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../interface/project";
import { Task } from "../interface/task";

@Pipe({
    name: 'deadline'
})

// Display the deadline of a project or task (pt) in the format "d / m / y"
export class deadlinePipe implements PipeTransform {
    transform(pt: Project | Task): string {
        return pt.deadline.d + " / " + pt.deadline.m + " / " + pt.deadline.y
    }
}