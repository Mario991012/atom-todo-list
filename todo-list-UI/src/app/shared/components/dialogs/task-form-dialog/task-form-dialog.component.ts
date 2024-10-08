import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-form-dialog.component.html',
})
export class TaskFormDialogComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string }
  ) {
    this.taskForm = this.fb.group({
      title: [data.title, [Validators.required]],
      description: [data.description, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.getRawValue());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
