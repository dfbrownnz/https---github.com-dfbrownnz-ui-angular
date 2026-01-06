import { Component, inject, input, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; //
import { CommonModule, JsonPipe } from '@angular/common';

import { injectQuery } from '@tanstack/angular-query-experimental'; // mutate state 
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../core/project.service';

import { ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort'; //

// import { computed } from '@angular/core';
// import { Todo } from '../core/types';

import { MyProjectsFormComponent } from '../my-projects/project-form/project-form.component'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [ MatTableModule, CommonModule, MyProjectsFormComponent],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.css',
})
export class MyProjects {
  currentProjectId: string | null = null;
  projectOwner: string | null = null;
  projectListName: string | null = null;
  projectId = input.required<string>();


  clickedRow: any;

  dataSource = new MatTableDataSource<any>([]);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // The effect should be placed inside the constructor body

  ) { }

  private snackBar = inject(MatSnackBar);
  //////////// tan stack 
  private http = inject(HttpClient);
  // Use a signal for the projectId (e.g., from an input or route)


  private projectService = inject(ProjectService);




  ngOnInit(): void {
    // Watch for changes in the URL (e.g., ?projectId=a)
    this.route.queryParams.subscribe(params => {
      this.currentProjectId = params['projectId'] ?? 1;
      this.projectOwner = params['projectOwner'] ?? "noOwner";
      this.projectListName = params['projectList'] ?? "1";
      
    });
    // 1. Correct logic to handle the queryParams subscription
    // this.route.queryParams.subscribe(params => {
    //   this.currentProjectId = params['projectId'] ?? 1;
    // });
  }

  // todoSummaryData
  todoData = injectQuery(() => ({
    // Wrapping in an arrow function makes it reactive and defers execution this.currentProjectId
    // queryKey: ['projects', this.projectId()],
    queryKey: ['projects',  this.currentProjectId],
    queryFn: () => this.projectService.getTodos( this.currentProjectId),
    staleTime: 1000 * 60 * 5,
  }));

  // todoData
  todoSummaryData = injectQuery(() => ({
    // Wrapping in an arrow function makes it reactive and defers execution
    queryKey: ['projects_summary', this.projectOwner, this.projectListName],
    // queryFn: async () => await this.projectService.postTodosSummary( this.projectOwner! , this.projectListName!  ) ,
    queryFn: () => this.projectService.postTodosSummary(this.projectOwner!, this.projectListName!),
    staleTime: 1000 * 60 * 5,

  }));

  // These strings must match the 'matColumnDef' values in the HTML
  displayedColumns: string[] = ['ProjectId', 'Id', 'Group', 'Name', 'Description', 'Owner', 'StatusFlag', 'StatusDate'];
  // Wrap your data in a MatTableDataSource for built-in sorting


  @ViewChild(MatSort) sort!: MatSort; //

  ngAfterViewInit() {
    // Connect the sort to the datasource after the view initializes
    this.dataSource.sort = this.sort;
  }



  onRowClick(row: any) {
    // console.log('Row clicked:', row);
    this.clickedRow = row;
  }

}
