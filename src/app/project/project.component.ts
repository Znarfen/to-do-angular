import { Component } from '@angular/core';
import { KanbanComponent } from '../kanban/kanban.component';
import { ListComponent } from '../list/list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../task/task.model';
import { GlobalComponent } from '../global.component';
import { Router } from '@angular/router';
import { Project } from './project.model';

@Component({
  selector: 'project',
  imports: [CommonModule, FormsModule, KanbanComponent, ListComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  constructor(private router: Router) {}

  project: Project = {
    name: "",
    description: "",
    deadline: {
      d: 0,
      m: 0,
      y: 0
    },
    tasks: []
  };

  editMode: boolean = false;

  data: string = "";

  newTask: string = '';
  editingValue: string = '';

  ngOnInit() {
    this.project = JSON.parse(localStorage.getItem(this.router.url.split('/')[1].toUpperCase()) || "");
    console.log("In project: \n" + JSON.stringify(this.project))
  }

  // Save project in browser
  save() {
    localStorage.setItem(this.project.name, JSON.stringify(this.project));
  }

  // Add a new task to the list
  addTask() {
    let id:number = this.getNewId(); 
    this.project.tasks.push({name: "Task",
                    description: "", priority: 1,
                    editMode: false, id: id,
                    status: 0,
                    img: this.data});
    this.newTask = '';
    
    this.save();
  }

  // Get a id that is not in use.
  getNewId() {
    let newId = 0;
    for (newId = 0; newId < this.project.tasks.length; newId++) {
      if (this.project.tasks[newId].id != newId) return newId;
    }
    return newId;
  }
}