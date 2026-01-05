// task-edit-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-edit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit-form.component.html'
})
export class TaskEditFormComponent implements OnChanges {
  @Input() task: any;

  @Output() taskSaved = new EventEmitter<any>(); // Emit the updated task

  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: [''],
      projectName: [''],
      taskName: [''],
      description: ['']
    });
  }

  // This lifecycle hook detects when a new task is clicked in the table
  ngOnChanges() {
    if (this.task) {
      this.editForm.patchValue(this.task);
    }
  }

  saveChanges() {
    // Send the modified task object back to the parent
    this.taskSaved.emit(this.task);
  }
}