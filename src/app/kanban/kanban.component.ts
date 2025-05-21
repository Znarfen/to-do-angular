import { Component, Input } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { Task } from '../task/task.model';

@Component({
  selector: 'kanban',
  imports: [CategoryComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent {
  @Input() tasks: Task[] = [];
}
