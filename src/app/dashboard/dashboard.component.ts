import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../project/project.model';
import { Task } from '../task/task.model';
import { Injectable } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { UrlCodec } from '@angular/common/upgrade';
import { deadlinePipe } from '../pipe/deadline.pipe';


@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule, deadlinePipe],
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
  projectReName: string = "";
  projectSearch: string = "";

  editProject: Project | null = null;

  //addedProjectErr: string | null = null;

  // debug html
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
  addProject(newProjectName: string, copyProject: boolean | Project = false):boolean {
    newProjectName = newProjectName.toLocaleUpperCase();

    const allowedChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-', '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let day = new Date();


    let newProject: Project;
    if (copyProject !== false) {
      newProject = copyProject as Project;
      newProject.name = newProjectName;
    } else {
      newProject = {
        name: newProjectName,
        description: "",
        deadline: {
          d: day.getDate(),
          m: day.getMonth() + 1,
          y: day.getFullYear()
        },
        tasks: []
      };
    }

    // If empty
    if (newProjectName == "") {
      alert("Project Needs To Have A Name")
      return false;
    }

    // If spaces exists
    if (newProjectName.includes(" ")) {
      alert("No Spaces In Project Name");
      return false;
    }

    // If unsuported char. is in use
    let nameHaveValidChars:boolean = false;
    for (let i = 0; i < newProjectName.length; i++) {
      nameHaveValidChars = false;
      allowedChars.forEach(char => {
        if (char == newProjectName.charAt(i)) nameHaveValidChars = true;
      });
      if (!nameHaveValidChars) {
        alert("You Have Used Unsuported Characters");
        return false;
      }
    }

    // Add project (if name do not exists)
    if (localStorage.getItem(newProject.name) == null) {
      this.projects.push(newProject);
      localStorage.setItem(newProjectName, JSON.stringify(newProject))
      newProjectName = "";
      return true;
    }
    // if project name alredy exists
    alert('Name "' + newProject.name + '" Alredy In Use');
    return false;
  }

  // Enter edit mode or check if project is in edit mode
  edit(project: Project, check: boolean = false):boolean {
    if (!check) {
      if (this.editProject == project) this.editProject = null;
      else this.editProject = project;
      return false;
    }
    return project == this.editProject;
  }

  // Change Project Name
  changeProjectName(project: Project) {
    let oldName: string = project.name;

    // Only proceed if the new project was actually created
    if (this.addProject(this.projectReName, project)) {
      localStorage.removeItem(oldName);
      window.location.href = window.location.origin + "/" + this.projectReName;
    }
    this.projectReName = "";
  }

  // Save
  save() {
    localStorage.setItem(this.editProject?.name || '', JSON.stringify(this.editProject));
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

  // Check if user have selected project
  isOnProjectPage(project:Project): boolean {
    if (window.location.href.split('/')[3] == project.name.toLowerCase()) {
      return true;
    }
    return false;
  }
}
