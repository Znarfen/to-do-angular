import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../project/project.model';
import { Task } from '../task/task.model';
import { Injectable } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard',
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
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
  projectSearch: string = "";

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

    const allowedChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-', '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let day = new Date();

    let newProject: Project = ({
      name: this.projectName,
      description: "",
      deadline: {
        d: day.getDate(),
        m: day.getMonth() + 1,
        y: day.getFullYear()
      },
      tasks: []
    })

    this.addedProjectErr = null

    // If empty
    if (this.projectName == "") {
      this.addedProjectErr = "Project Needs To Have A Name"
      return;
    }

    // If spaces exists
    if (this.projectName.includes(" ")) {
      this.addedProjectErr = "No Spaces In Project Name";
      return;
    }

    // If unsuported char. is in use
    let nameHaveValidChars:boolean = false;
    for (let i = 0; i < this.projectName.length; i++) {
      nameHaveValidChars = false;
      allowedChars.forEach(char => {
        if (char == this.projectName.charAt(i)) nameHaveValidChars = true;
      });
      if (!nameHaveValidChars) {
        this.addedProjectErr = "You Have Used Unsuported Characters"
        return;
      }
    }

    // Add project (if name do not exists)
    if (localStorage.getItem(newProject.name) == null) {
      this.projects.push(newProject);
      localStorage.setItem(this.projectName, JSON.stringify(newProject))
      this.projectName = "";
      return;
    }
    // if project name alredy exists
    else this.addedProjectErr = 'Name "' + newProject.name + '" Alredy In Use'
  }

  // Search for projects
  searchProjects() {
    this.projects = this.getProjects();
    if (this.projectSearch == "") {
      this.projects = this.getProjects();
      return;
    }
    this.projects = this.projects.filter(project => project.name.toLocaleUpperCase().includes(this.projectSearch.toLocaleUpperCase()));
  }

  isOnProjectPage(project:Project): boolean {
    if (window.location.href.split('/')[3] == project.name.toLowerCase()) {
      return true;
    }
    return false;
  }
}
