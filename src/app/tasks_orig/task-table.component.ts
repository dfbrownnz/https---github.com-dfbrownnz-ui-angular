// task-table.component.ts
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-table',
   imports: [JsonPipe , CommonModule],
  standalone: true,
  templateUrl: `./task-table.component.html`
})
export class TaskTableComponent {
  @Input() taskList: any[] = [];


@Output() taskSelected = new EventEmitter<any>();

onRowClick(task: any) {
    this.taskSelected.emit(task);
    // console.log( '|TaskTableComponent|taslk|',  task )
  }
  
}