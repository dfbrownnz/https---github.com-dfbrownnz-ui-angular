import { Routes } from '@angular/router';
import { MySettings } from './my-settings/my-settings'
import { MyUsers } from  './my-users/my-users'
import { MyProjects } from  './my-projects/my-projects'
import {MyProjectToPm} from './my-project-to-pm/my-project-to-pm'
import { MySqlParser } from './my-sql-parser/my-sql-parser';
import { ProjectList } from './project-list/project-list';


export const routes: Routes = [
  { path: 'settings', component: MySettings },
  { path: 'users', component: MyUsers },
  { path: 'projects', component: MyProjects }, // MyProjectToPm
  { path: 'projectsToPm', component: MyProjectToPm }, // MyProjectToPm
  { path: 'sqlparser', component: MySqlParser }, // MyProjectToPm
  { path: 'ProjectList', component: ProjectList }, // MyProjectToPm
 
  { path: '', redirectTo: '/users', pathMatch: 'full' } // Optional: default page
];