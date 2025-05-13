import { Component, Injector } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CategoryComponent } from './category/category.component';
import { Task } from './task/task.model';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalComponent } from './global.component';

@Component({
  imports: [RouterOutlet, FormsModule, CommonModule, CategoryComponent], // Removed BrowserModule
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  tasks: Task[] = [];
  newTask: string = '';
  editingValue: string = '';
  id: number = GlobalComponent.ID_UNASSIGNED;

  // Add a new task to the list
  addTask(taskName: string) {
    this.id++;
    this.tasks.push({name: taskName, priority: 0, editMode: false, id: this.id, status: 0});
    this.newTask = '';
  }
}