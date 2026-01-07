// task-table.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; //
import { Component, Input, Output, EventEmitter, inject, input, signal, effect } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { ProjectService } from '../core/project.service';

import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-table',
  imports: [CommonModule, MatTableModule],
  standalone: true,
  templateUrl: `./task-detail.html`
})
export class TaskDetailTableComponent {
  @Input() taskList: any[] = [];
  @Output() taskSelected = new EventEmitter<any>();
  //@Input({ required: true }) projectId: string = "1";
  @Input({ required: true }) projectId!: string;


  currentProjectId: string | null = null;
  projectOwner: string | null = null;
  projectListName: string | null = null;
  //  projectId : string | null = null;

  clickedRow: any;

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private router: Router, //
    private route: ActivatedRoute, //
    // The effect should be placed inside the constructor body //

  ) {

  }

  private snackBar = inject(MatSnackBar);
  //////////// tan stack 
  private http = inject(HttpClient);
  // Use a signal for the projectId (e.g., from an input or route)
  private projectService = inject(ProjectService);

  // 1. Get the projectId as a signal from queryParams
  // readonly projectId = toSignal(this.route.queryParams.pipe(map(p => p['projectId'])));

  // constructor(private route: ActivatedRoute) {}
  private queryClient = inject(QueryClient);

  ngOnInit(): void {
    // Watch for changes in the URL (e.g., ?projectId=a)
    this.route.queryParams.subscribe(params => {
      this.currentProjectId = params['projectId'] ?? 1;
      this.projectOwner = params['projectOwner'] ?? "noOwner";
      this.projectListName = params['projectList'] ?? "1";
       this.projectId = params['projectId'] ?? 1;

      // this.route.queryParams.subscribe(params => {
      //   this.projectId = params['projectId'];
      //   console.log('|ngOnInit', this.projectId);
      // });


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
    queryKey: ['tasks', this.projectId],
    queryFn: async () => {
      console.log(` Network Request: Fetching tasks for Project ID: ${this.projectId}`);
      return this.projectService.getTodos(this.projectId);
    },
    // staleTime: 1000 * 60 * 5,
    staleTime: 0, // Ensures it considers data old immediately upon ID change
    // Ensure the query is enabled
    enabled: !!this.projectId
  }));

  // todoData
  todoSummaryData = injectQuery(() => ({
    // Wrapping in an arrow function makes it reactive and defers execution
    queryKey: ['projects_summary'],
    // queryFn: async () => await this.projectService.postTodosSummary( this.projectOwner! , this.projectListName!  ) ,
    queryFn: () => this.projectService.postTodosSummary(this.projectOwner!, this.projectListName!),
    staleTime: 1000 * 60 * 5,

  }));

  // These strings must match the 'matColumnDef' values in the HTML
  displayedColumns: string[] = ['ProjectId', 'Id', 'Group', 'Name', 'Description', 'Owner', 'StatusFlag', 'StatusDate'];
  // Wrap your data in a MatTableDataSource for built-in sorting


  onRowClick(task: any) {
    this.taskSelected.emit(task);
    console.log('|TaskDetailTableComponent|onRowClick|', task)
  }

}