// project-dashboard.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { TaskDetailTableComponent } from './task-detail';
import { TaskEditFormComponent } from './task-edit-form';
import { TaskSummaryComponent } from './task-summary';
import { CommonModule } from '@angular/common';
import { Todo, TodoSummary } from '../core/types';


@Component({
    selector: 'app-project-dashboard',
    imports: [TaskSummaryComponent, TaskDetailTableComponent, TaskEditFormComponent, CommonModule],
    // imports: [   ] ,
    standalone: true,
    templateUrl: './task-parent.html',
})
export class TaskParentComponent {

    currentProjectId: string = '3';
    @Output() projectPicked = new EventEmitter<string>();

    onProjectPicked(todoSummary: TodoSummary) {
        this.selectedProject = { ...todoSummary };
        this.allTasks = this.allTasksOrig.filter(task => task.projectId === todoSummary.projectId);

        if (this.allTasks.length == 0) {
            this.allTasks = [...this.allTasksOrig];
        }
        this.currentProjectId = todoSummary.projectId ;
    console.log('onProjectPicked Project changed to:', this.currentProjectId);
    }

    onTaskPicked(task: any) {
        this.selectedTask = { ...task };
        // console.log('|TaskParentComponent|onTaskPicked|this.selectedTask|' , this.selectedTask )
    }
    allTasksOrig: any[] = [];
    allTasks: any[] = [];
    selectedTask: Todo = null;
    selectedProject: TodoSummary = null;

    // onTaskSelect(task: any) {
    //     this.selectedTask = { ...task }; // Use a spread to avoid direct mutation
    // }

    ngOnInit() {
        this.allTasksOrig = [
            { projectId: '1', id: 'T-101', projectName: 'Q1 Roadmap', taskName: 'Database Migration', owner: 'Bob', status: 'Completed' },
            { projectId: '1', id: 'T-102', projectName: 'Q1 Roadmap', taskName: 'UI Refactor', owner: 'Alice', status: 'Pending' },
            { projectId: '2', id: 'T-103', projectName: 'Security Audit', taskName: 'API Penetration Test', owner: 'Bob', status: 'Pending' },
            { projectId: '2', id: 'T-104', projectName: 'Admin Portal', taskName: 'User Role Mapping', owner: 'Charlie', status: 'Completed' },
            { projectId: '2', id: 'T-105', projectName: 'Admin Portal', taskName: 'Login Fix', owner: 'Bob', status: 'Pending' }
        ];
        this.allTasks = [...this.allTasksOrig];
    }

    handleSave(updatedTask: any) {
        // 1. Find the index of the task by its ID (e.g., T-105)
        const index = this.allTasks.findIndex(t => t.id === updatedTask.id);
        console.log('ProjectDashboardComponent|handleSave|index|', index, updatedTask.id)

        if (index !== -1) {
            // 2. Update the array with new values (e.g., "Login Fixcc")
            // Use the spread operator to ensure Angular detects the change for the summary cards
            this.allTasks[index] = { ...updatedTask };
            this.allTasks = [...this.allTasks];

            // 3. Clear selection to hide the form
            this.selectedTask = null;
        }
    }

    // Inside TaskSummaryComponent


selectProject(id: string) {
  this.projectPicked.emit(id);
}
}