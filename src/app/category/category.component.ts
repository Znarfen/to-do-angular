import { Component, Input } from '@angular/core';
import { GlobalComponent } from '../global.component';
import { Task } from '../task/task.model';
import { TaskComponent } from '../task/task.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'category',
  standalone: true,
  imports: [TaskComponent, CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent<T extends Task = Task> {
  @Input() tasks: T[] = [];
  @Input() taskStatus: number = 0;
  @Input() getStatus?: (status: number) => string;

  getStatusName(): string {
    switch (this.taskStatus) {
      case GlobalComponent.TASK_STATUS_TO_DO:
        return 'To Do';
      case GlobalComponent.TASK_STATUS_IN_PROGRESS:
        return 'In Progress';
      case GlobalComponent.TASK_STATUS_DONE:
        return 'Done';
      case GlobalComponent.TASK_STATUS_REMOVED:
        return 'Removed';
      default:
        return 'Unknown';
    }
  }
}