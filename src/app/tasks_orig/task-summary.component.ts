// task-summary.component.ts
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-task-summary',
  templateUrl: 'task-summary.component.html',
  styleUrls: ['./task-summary.component.css']
})
export class TaskSummaryComponent implements OnChanges {
  @Input() tasks: any[] = [];

  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;

 ngOnChanges() {
  if (this.tasks) {
    this.totalTasks = this.tasks.length;
    this.completedTasks = this.tasks.filter(t => t.status === 'Completed').length;
    this.pendingTasks = this.tasks.filter(t => t.status === 'Pending').length;
  }
}
}