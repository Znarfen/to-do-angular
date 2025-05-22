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
  constructor(public router: Router) {}

  project!: Project;

  editMode: boolean = false;

  data: string = "";

  newTask: string = '';
  editingValue: string = '';

  ngOnInit() {
    this.project = JSON.parse(localStorage.getItem(this.router.url.split('/')[1].toUpperCase()) || "");
    console.log("In project " + this.project.name + ": \n" + JSON.stringify(this.project))
  }

  // reload project
  reload() {
    this.project = JSON.parse(localStorage.getItem(this.router.url.split('/')[1].toUpperCase()) || "");
  }

  // Save project in browser
  save() {
    localStorage.setItem(this.project.name, JSON.stringify(this.project));
  }

  // Add a new task to the list
  addTask() {
    this.reload();

    let newId:number = this.getNewId();
    this.project.tasks.push({name: "Task",
                    description: "",
                    priority: 1,
                    editMode: false, 
                    id: newId,
                    status: 0,
                    img: ""});
    this.newTask = '';
    this.save();
  }

  // Get a id that is not in use.
  getNewId() {
    this.reload();
    let newId:number = 0;
    let foundId = false;
    while(!foundId) {
      newId = Math.floor(Math.random() * 10000)
      foundId = true;

      this.project.tasks.forEach(tsk => {
        if (tsk.id == newId) foundId = false;
      });
    }

    return newId++;
  }
}