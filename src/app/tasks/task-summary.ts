// task-summary.component.ts
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { inject, input, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; //
import { CommonModule, JsonPipe } from '@angular/common';

import { injectQuery } from '@tanstack/angular-query-experimental'; // mutate state 
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../core/project.service';

import { ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort'; //

import { computed } from '@angular/core';

import { Todo, TodoSummary } from '../core/types';

import { MyProjectsFormComponent } from '../my-projects/project-form/project-form.component'
import { MatSnackBar } from '@angular/material/snack-bar';


import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs'

import { 
  createAngularTable, 
  FlexRenderDirective, 
  getCoreRowModel, 
  ColumnDef 
} from '@tanstack/angular-table'

@Component({
  selector: 'app-task-summary',
  imports: [MatTableModule, CommonModule  ],
  templateUrl: 'task-summary.html',
  styleUrls: ['./task-summary.css']
})
export class TaskSummaryComponent { //implements OnChanges {
  private projectService = inject(ProjectService);
  dataSource = new MatTableDataSource<any>([]);
    
  @Input() tasks: any[] = [];
  private route = inject(ActivatedRoute);
  constructor(private router: Router) { }

    readonly projectOwner = toSignal(
  this.route.queryParamMap.pipe(map(params => params.get('projectOwner'))),
  { initialValue: this.route.snapshot.queryParamMap.get('projectOwner') }
);
  readonly projectListName = toSignal(
  this.route.queryParamMap.pipe(map(params => params.get('projectList'))),
  { initialValue: this.route.snapshot.queryParamMap.get('projectList') }
);
  readonly projectId = toSignal(
  this.route.queryParamMap.pipe(map(params => params.get('projectId'))),
  { initialValue: this.route.snapshot.queryParamMap.get('projectId') }
);


readonly todoSummaryData = injectQuery(() => ({
  queryKey: ['todo-summary'], // Ensure this signal has a value
  queryFn: () => this.projectService.postTodosSummary( this.projectOwner()  , this.projectListName()  ),
  enabled: !!this.projectOwner()   && !! this.projectListName()   , // Only run if 'bob' is found
}));

 
  displayedColumns: string[] = [
    'projectId', 
    'statusDate', 
    'approval', 
    'configuration', 
    'testing', 
    'production', 
    'validation'
  ];

 

 @Output() projectPicked = new EventEmitter<TodoSummary>();

  onRowClick(row: TodoSummary): void {
    console.log('Row clicked:TaskSummaryComponent|', row);
    // Emit the projectId to the parent
    this.projectPicked.emit(row);

    // this.router.navigate([], {
    //   queryParams: {

    //     'projectId': row.projectId
    //   },
    //   queryParamsHandling: 'merge' // Keeps existing parameters like projectId
    // });
  }

  readonly tableData = computed(() => {
    const result = this.todoSummaryData.data();
    // Use the array directly as seen in your JSON dump
    return Array.isArray(result) ? result : [];
  });
  // Define column structure based on your JSON
// 3. Configure columns to match your keys: "group", "statusFlag", "statusDate"
  readonly columns: ColumnDef<any>[] = [
    { accessorKey: 'projectId', header: 'projectId' },
    { accessorKey: 'statusDate', header: 'Status' },
    { accessorKey: 'approval', header: 'approval' }
  ];
//  { "projectId": "2", "statusDate": "20250103", "approval": "In Progress", "configuration": "Not Started", "testing": "Not Started", "production": "Not Started", "validation": "Not Started" }
  // readonly tableData = computed(() => this.todoSummaryData.data() ?? []);

  // Initialize the TanStack Table
// 4. Initialize the Table
  readonly table = createAngularTable(() => ({
    data: this.tableData(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
  }));

}