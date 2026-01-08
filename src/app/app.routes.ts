import { Routes } from '@angular/router';
import { MyProjects } from  './my-projects/my-projects'

import { ProjectList } from './project-list/project-list';
import { TaskParentComponent } from './tasks/task-parent';



export const routes: Routes = [
  { path: 'projects', component: MyProjects }, // MyProjectToPm
  { path: 'ProjectList', component: ProjectList }, // MyProjectToPm
  { path: 'tasks', component: TaskParentComponent  }, // MyProjectToPm
  // 
 
  { path: '', redirectTo: '/users', pathMatch: 'full' } // Optional: default page
];