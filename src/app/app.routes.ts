import { Routes } from '@angular/router';
import { MySettings } from './my-settings/my-settings'
import { MyUsers } from  './my-users/my-users'
import { MyProjects } from  './my-projects/my-projects'

import { MySqlParser } from './my-sql-parser/my-sql-parser';
import { ProjectList } from './project-list/project-list';
import { TaskParentComponent } from './tasks/task-parent';



export const routes: Routes = [
  { path: 'settings', component: MySettings },
  { path: 'users', component: MyUsers },
  { path: 'projects', component: MyProjects }, // MyProjectToPm
  // { path: 'sqlparser', component: MySqlParser }, // MyProjectToPm
  { path: 'ProjectList', component: ProjectList }, // MyProjectToPm
  { path: 'tasks', component: TaskParentComponent  }, // MyProjectToPm
  // 
 
  { path: '', redirectTo: '/users', pathMatch: 'full' } // Optional: default page
];