// task-table.component.ts
import { CommonModule  } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-table',
  imports: [ CommonModule],
  standalone: true,
  templateUrl: `./task-detail.html`
})
export class TaskDetailTableComponent {
  @Input() taskList: any[] = [];
  @Output() taskSelected = new EventEmitter<any>();

  onRowClick(task: any) {
    this.taskSelected.emit(task);
    console.log( '|TaskDetailTableComponent|onRowClick|',  task )
  }

}