import { Component, Input } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../project/project.model';
import { Task } from '../task/task.model';
import { Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dashboard',
  imports: [CommonModule, ProjectComponent, FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class DashboardComponent {
  constructor() {}

  projects: Project[] = this.getProjects();
  projectName: string = "";

  addedProjectErr: string | null = null;

  check(arg:any) {console.log(arg)}

  // Get all projects from local storage
  getProjects():Project[] {
    let allProjects: Project[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) != null) {
        allProjects.push(JSON.parse(localStorage.getItem(localStorage.key(i) || '') || ''));
      }
    }
    return allProjects;
  }

  // Add a project to local storage (project name is projectName)
  // If projectName is not suitable change addedProjectErr to reflect why
  addProject() {
    this.projectName = this.projectName.toLocaleUpperCase();

    let allowedChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-', '_']

    let newProject: Project = ({
      name: this.projectName,
      description: "",
      editMode: false,
      deadline: {
        d: 0,
        m: 0,
        y: 0
      },
      tasks: []
    })

    this.addedProjectErr = null

    if (this.projectName == "") {
      this.addedProjectErr = "Project Needs To Have A Name"
      return
    }

    if (this.projectName.includes(" ")) {
      this.addedProjectErr = "No Spaces In Project Name";
    }

    if (localStorage.getItem(newProject.name) == null) {
      this.projects.push(newProject);
      localStorage.setItem(this.projectName, JSON.stringify(newProject))
      this.projectName = "";
      return
    }
    else this.addedProjectErr = 'Name "' + newProject.name + '" Alredy In Use'
  }
}
