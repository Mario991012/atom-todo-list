import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskService } from '../../services/tasks/task.service';
import { TaskFormDialogComponent } from '../../shared/components/dialogs/task-form-dialog/task-form-dialog.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class DashboardComponent {
  tasks = signal<Task[]>([]);
  taskService = inject(TaskService);
  dialog = inject(MatDialog);
  router = inject(Router);

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  openTaskFormDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      data: task || { title: '', description: '', completed: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (task) {
          this.taskService.updateTask(task.id, result).subscribe(() => {
            this.loadTasks();
          });
        } else {
          const newTask: Task = {
            id: 0,
            title: result.title,
            description: result.description,
            createdAt: new Date(),
            completed: false,
          };
          this.taskService.addTask(newTask).subscribe(() => {
            this.loadTasks();
          });
        }
      }
    });
  }

  toggleTaskCompletion(task: Task) {
    this.taskService.toggleTaskCompletion(task).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
