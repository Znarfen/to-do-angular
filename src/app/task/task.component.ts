import { Component, Input } from '@angular/core';
import { Task } from './task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GlobalComponent } from '../global.component';

@Component({
  selector: 'task',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})


export class TaskComponent {

  newValue: string = '';

  startEditing(task: Task) {
    task.editMode = true;
  }

  changePriority(task: Task, howMuch: number) {
    if (task.priority + howMuch < 0) {
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
    if (this.newValue.trim()) {
      task.name = this.newValue.trim();
      task.editMode = false;
    }
  }

  cancelEdit(task: Task) {
    task.editMode = false;
  }

  @Input() task!: Task;
}
