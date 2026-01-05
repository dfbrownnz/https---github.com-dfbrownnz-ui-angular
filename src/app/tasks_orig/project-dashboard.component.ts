// project-dashboard.component.ts
import { Component } from '@angular/core';
import { TaskTableComponent } from './task-table.component';
import { TaskEditFormComponent } from './task-edit-form.component';
import { TaskSummaryComponent } from './task-summary.component';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-project-dashboard',
    imports: [TaskTableComponent, TaskEditFormComponent, TaskSummaryComponent , CommonModule ],
    // imports: [   ] ,
    standalone: true,
    templateUrl: './project-dashboard.component.html',
})
export class ProjectDashboardComponent {
    onTaskPicked(task: any) {
        this.selectedTask = { ...task };
        console.log('|ProjectDashboardComponent|onTaskPicked|this.selectedTask|' , this.selectedTask )
    }
    //allTasks = [{ id : 1, name : "a" } , { id : 2, name : "b" } ]; // Your task array from the backend
    allTasks: any[] = []; // Correct: matches the expected type any[]
    selectedTask: any = null;

    onTaskSelect(task: any) {
        // This is triggered when a row in the table is clicked
        this.selectedTask = { ...task }; // Use a spread to avoid direct mutation
    }

    onTaskUpdate(updatedTask: any) {
        // Update the main list with the new data from the form
        const index = 0; // this.allTasks.findIndex(t => t.id === updatedTask.id);
        // if (index !== -1) {
        //   //this.allTasks[index] = updatedTask;
        //   this.selectedTask = null; // Optionally hide form after submit
        // }
    }

    ngOnInit() {
        this.allTasks = [
            { id: 'T-101', projectName: 'Q1 Roadmap', taskName: 'Database Migration', owner: 'Bob', status: 'Completed' },
            { id: 'T-102', projectName: 'Q1 Roadmap', taskName: 'UI Refactor', owner: 'Alice', status: 'Pending' },
            { id: 'T-103', projectName: 'Security Audit', taskName: 'API Penetration Test', owner: 'Bob', status: 'Pending' },
            { id: 'T-104', projectName: 'Admin Portal', taskName: 'User Role Mapping', owner: 'Charlie', status: 'Completed' },
            { id: 'T-105', projectName: 'Admin Portal', taskName: 'Login Fix', owner: 'Bob', status: 'Pending' }
        ];
    }

    handleSave(updatedTask: any) {
    // 1. Find the index of the task by its ID (e.g., T-105)
    const index = this.allTasks.findIndex(t => t.id === updatedTask.id);
    console.log('ProjectDashboardComponent|handleSave|index|' , index , updatedTask.id)

    if (index !== -1) {
      // 2. Update the array with new values (e.g., "Login Fixcc")
      // Use the spread operator to ensure Angular detects the change for the summary cards
      this.allTasks[index] = { ...updatedTask };
      this.allTasks = [...this.allTasks]; 
      
      // 3. Clear selection to hide the form
      this.selectedTask = null;
    }
  }
}