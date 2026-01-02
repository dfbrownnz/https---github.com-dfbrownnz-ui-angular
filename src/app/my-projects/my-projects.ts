import { Component, inject, input, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; //
import { CommonModule, JsonPipe } from '@angular/common';

import { injectQuery } from '@tanstack/angular-query-experimental'; // mutate state 
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../core/project.service';

import { ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort'; //

import { computed } from '@angular/core';

import { Todo } from '../core/types';

import {MyProjectsFormComponent} from '../my-projects/project-form/project-form.component'

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [MatTableModule, CommonModule , MyProjectsFormComponent  ],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.css',
})
export class MyProjects  {
  currentProjectId: string | null = null;
  currentSelectedData: any = null;
  clickedRow: any;

  dataSource = new MatTableDataSource<any>([]);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // The effect should be placed inside the constructor body

  ) { }
 

  //////////// tan stack 
  private http = inject(HttpClient);
// Use a signal for the projectId (e.g., from an input or route)
projectId = input.required<string>();
  private projectService = inject(ProjectService);
  private todoData1 = []

ngOnInit(): void {
  // Watch for changes in the URL (e.g., ?projectId=a)
  this.route.queryParams.subscribe(params => {
    this.currentProjectId = params['projectId'];
  });
}


todoData = injectQuery(() => ({
  // Wrapping in an arrow function makes it reactive and defers execution
  queryKey: ['projects', this.projectId()],
  queryFn: () => this.projectService.getTodos(this.projectId()),
  staleTime: 1000 * 60 * 5,
}));


// columnHelper = createColumnHelper<Todo>();
yo = signal([
  {
    "ProjectId": "2",
    "Id": 1,
    "Description": "cleanup",
    "Name": "dishes",
    "Group": "Testing",
    "StatusFlag": "Not Started",
    "StatusDate": "20250101"
  }
]);

// These strings must match the 'matColumnDef' values in the HTML
displayedColumns: string[] = [ 'ProjectId',  'Id', 'Name', 'Group','Description', 'StatusFlag', 'StatusDate'];
// Wrap your data in a MatTableDataSource for built-in sorting


@ViewChild(MatSort) sort!: MatSort; //

ngAfterViewInit() {
  // Connect the sort to the datasource after the view initializes
  this.dataSource.sort = this.sort;
}

 
onRowClick(row: any) {
    console.log('Row clicked:', row);
    this.currentSelectedData = row; 

    this.clickedRow = row;
    console.log('Task selected:', row.Name); // e.g., "walk dog"
  }

}
