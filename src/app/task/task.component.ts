import { Component, Input } from '@angular/core';
import { Task } from './task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalComponent } from '../global.component';

@Component({
  selector: 'task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})


export class TaskComponent {

  newName: string = '';
  newDescription: string = '';

  startEditing(task: Task) {
    task.editMode = true;
    this.newName = task.name;
    this.newDescription = task.description;
  }

  changePriority(task: Task, howMuch: number) {
    if (task.priority + howMuch < 1) {
      return;
    }
    if (task.priority + howMuch > GlobalComponent.TASK_MAX_PRIORITY) {
      return;
    }
    task.priority = task.priority + howMuch;
  }

  increaseTask(task: Task, direction: number) {
    if (task.status > GlobalComponent.TASK_STATUS_DONE) return;
    if (task.status < GlobalComponent.TASK_STATUS_TO_DO) return;
    task.status = task.status + direction;
  }

  getStatus(task: Task, direction: number) {
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

  removeTask(task: Task) {
    task.status = GlobalComponent.TASK_STATUS_REMOVED;
  }

  saveTask(task: Task) {
    if (this.newName.trim()) {
      task.name = this.newName.trim();
      task.description = this.newDescription.trim();
      task.editMode = false;
    }
  }

  cancelEdit(task: Task) {
    task.editMode = false;
  }

  @Input() task!: Task;
}
