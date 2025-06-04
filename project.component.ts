import { Component } from '@angular/core';
import { KanbanComponent } from '../kanban/kanban.component';
import { ListComponent } from '../list/list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../task/task.model';
import { GlobalComponent } from '../global.component';
import { Router } from '@angular/router';
import { Project } from './project.model';
import { deadlinePipe } from '../pipe/deadline.pipe';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'project',
  standalone: true,
  imports: [CommonModule, FormsModule, KanbanComponent, deadlinePipe, HttpClientModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  constructor(
    public router: Router,
    private api: ApiService
  ) {}

  project!: Project;

  editMode: boolean = false;
  data: string = "";

  newTask: string = '';
  editingValue: string = '';

  exampleTasks?: JSON;

  ngOnInit() {
    this.project = JSON.parse(localStorage.getItem(this.router.url.split('/')[1].toUpperCase()) || "");
    //console.log("In project " + this.project.name + ": \n" + JSON.stringify(this.project))

    this.api.getTasks()
      .subscribe(tsk => {
        this.exampleTasks = tsk;
      });
    }

  // Save project in browser
  save() {
    localStorage.setItem(this.project.name, JSON.stringify(this.project));
    this.project = JSON.parse(localStorage.getItem(this.router.url.split('/')[1].toUpperCase()) || "");
  }

  // Edit project
  edit() {
    this.editMode = !this.editMode;
    //console.log("Edit Mode:", this.editMode);
  }

  // Change deadline (dmy is "d" for day, "m" for month, "y" for year , anount is chage)
  changeDeadline(dmy:string, amount:number) {
    switch (dmy) {
      case "d":
        this.project.deadline.d += amount;
        if (this.project.deadline.d > 31) {
          this.project.deadline.d = 1;
          this.changeDeadline('m', 1)
        }
        else if (this.project.deadline.d <= 0) {
          this.project.deadline.d = 31;
          this.changeDeadline('m', -1)
        }
        break;

      case "m":
        this.project.deadline.m += amount;
        if (this.project.deadline.m > 12) {
          this.project.deadline.m = 1;
          this.changeDeadline('y', 1)

        }
        else if (this.project.deadline.m <= 0) {
          this.project.deadline.m = 12;
          this.changeDeadline('y', -1)
        }
        break;

      case "y":
        this.project.deadline.y += amount;
        break;
    
      default:
        console.error('"dmy" can only be "d" (day) , "m" (month) or "y" (year).')
        return;
    }
    this.save();
    return;
  }

  // Change description
  cangeDescription(newDescription:string) {
    this.project.description = newDescription
  }

  // Remove project
  removeProject() {
    if (confirm("Are you sure you want to delete this project?")) {
      localStorage.removeItem(this.project.name);
      //this.save();
      this.router.navigate(['/']);
    }
  }

  // Add a new task to the list
  addTask() {
    let day = new Date();
    let newId:number = this.getNewId();
    this.project.tasks.push({
      name: this.api.getRandomTask(this.exampleTasks),
      description: "",
      priority: 1,
      editMode: false, 
      id: newId,
      status: 0,
      deadline: {
        d: day.getDate(),
        m: day.getMonth() + 1,
        y: day.getFullYear()
      }
    });
    this.newTask = '';
    this.save();
  }

  // Get a id that is not in use.
  getNewId():number {
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