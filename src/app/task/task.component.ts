import { Component, Input } from '@angular/core';
import { Task } from './task.model';
import { Project } from '../project/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalComponent } from '../global.component';
import { Router } from '@angular/router';

@Component({
  selector: 'task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  constructor(public router: Router) {}

  newName: string = '';
  newDescription: string = '';
  declare project: Project;

  ngOnInit() {
    this.reload();
    //console.log("In project " + this.project.name + ": \n" + JSON.stringify(this.project))
  }

  // reload project
  reload() {
    this.project = JSON.parse(localStorage.getItem(this.router.url.split('/')[1].toUpperCase()) || "");
  }

  // Start to edeit task
  startEditing(task: Task) {
    let canEdit = true;

    this.project.tasks.forEach(tsk => {
      if (tsk.editMode) canEdit = false;
    });

    if (canEdit) {
      task.editMode = true;
      this.newName = task.name;
      this.newDescription = task.description;
    }
  }

  // Change prio. of task
  changePriority(task: Task, howMuch: number) {
    if (task.priority + howMuch < 1) {
      return;
    }
    if (task.priority + howMuch > GlobalComponent.TASK_MAX_PRIORITY) {
      return;
    }
    task.priority = task.priority + howMuch;
  }

  // Change deadline (dmy is "d" for day, "m" for month, "y" for year , anount is chage)
  changeDeadline(task:Task, dmy:string, amount:number) {
    switch (dmy) {
      case "d":
        this.task.deadline.d += amount;
        if (this.task.deadline.d > 31) {
          this.task.deadline.d = 1;
          this.changeDeadline(task, 'm', 1);
        }
        else if (this.task.deadline.d <= 0) {
          this.task.deadline.d = 31;
          this.changeDeadline(task, 'm', -1);

        }
        break;

      case "m":
        this.task.deadline.m += amount;
        if (this.task.deadline.m > 12) {
          this.task.deadline.m = 1;
          this.changeDeadline(task, 'y', 1);

        }
        else if (this.task.deadline.m <= 0) {
          this.task.deadline.m = 12;
          this.changeDeadline(task, 'y', -1);

        }
        break;

      case "y":
        this.task.deadline.y += amount;
        break;
    
      default:
        console.error('"dmy" can only be "d" (day) , "m" (month) or "y" (year).')
        return;
    }
    return;
  }

  // Increse task (if direction is >0: decrese)
  increaseTask(task: Task, direction: number) {
    if (task.status > GlobalComponent.TASK_STATUS_DONE) return;
    if (task.status < GlobalComponent.TASK_STATUS_TO_DO) return;
    task.status = task.status + direction;
    this.saveTask(task);
  }
  
  // Get a stetus from a task
  getStatus(task: Task, direction: number):string {
    if (task.status + direction == GlobalComponent.TASK_STATUS_TO_DO) {
      return 'To Do';
    }
    if (task.status + direction == GlobalComponent.TASK_STATUS_IN_PROGRESS) {
      return 'Ongoing';
    }
    if (task.status + direction == GlobalComponent.TASK_STATUS_DONE) {
      return 'Done';
    }
    return 'n/a';
  }

  // Remove task
  removeTask(task: Task) {
    this.reload();
    task.status = GlobalComponent.TASK_STATUS_REMOVED;

    for (let i = 0; i < this.project.tasks.length; i++) {
      if (task.id == this.project.tasks[i].id) {
        this.project.tasks[i].id = GlobalComponent.TASK_STATUS_REMOVED;
        this.project.tasks.splice(i, 1);
      };
    }
    localStorage.setItem(this.project.name, JSON.stringify(this.project));
  }

  // Save task temp.
  changeTask(task: Task) {
    if (this.newName.trim()) {
      task.name = this.newName.trim();
      task.description = this.newDescription.trim();
      task.editMode = false;
      this.saveTask(task);
    }
  }

  // Cancel edit mode
  cancelEdit(task: Task) {
    task.editMode = false;
  }

  // Save task in browser
  saveTask(newTask: Task) {
    this.reload();
    for (let i = 0; i < this.project.tasks.length; i++) {
      if (newTask.id == this.project.tasks[i].id) {
        this.project.tasks.splice(i, 1);
        this.project.tasks.push(newTask);
      };
    }
    localStorage.setItem(this.project.name, JSON.stringify(this.project))
  }

  @Input() task!: Task;
}
