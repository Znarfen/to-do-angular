import { Component } from '@angular/core';
import { KanbanComponent } from '../kanban/kanban.component';
import { ListComponent } from '../list/list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../task/task.model';
import { GlobalComponent } from '../global.component';

@Component({
  selector: 'project',
  imports: [CommonModule, FormsModule, KanbanComponent, ListComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  data: string = "";

  tasks: Task[] = [];
  newTask: string = '';
  editingValue: string = '';
  id: number = GlobalComponent.ID_UNASSIGNED;

  // Add a new task to the list
  addTask() {
    this.id++;
    this.tasks.push({name: "Task: " + this.id,
                    description: "", priority: 1,
                    editMode: false, id: this.id,
                    status: 0,
                    img: this.data});
    this.newTask = '';
  }
}