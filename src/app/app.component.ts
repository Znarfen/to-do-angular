import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet, FormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  tasks: Task[] = [];
  newTask: string = '';
  editingIndex: number | null = null;
  editingValue: string = '';

  // Add a new task to the list
  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({name: this.newTask, completed: false, priority: 0});
      this.newTask = '';
    }
  }

  // Start editing a task by its index
  startEditing(index: number) {
    this.editingIndex = index;
    this.editingValue = this.tasks[index].name;
  }

  // Save the edited task
  saveTask(index: number) {
    if (this.editingValue.trim()) {
      this.tasks[index].name = this.editingValue.trim();
      this.editingIndex = null;
    }
  }

  // Cancel editing a task
  cancelEdit() {
    this.editingIndex = null;
  }

  // Change priority to a task by 'howMuch' value
  changePriority(index: number, howMuch: number) {
    if (this.tasks[index].priority + howMuch < 0) {
      return;
    }

    this.tasks[index].priority = this.tasks[index].priority + howMuch;
  }

  // Complete a task
  completeTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  // Remove a task from the list by its index
  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}