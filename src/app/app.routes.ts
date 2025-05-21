import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';

export const routes: Routes = [
    { path: ':name', component: ProjectComponent },
];