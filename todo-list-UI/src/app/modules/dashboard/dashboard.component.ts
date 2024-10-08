import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskService } from '../../services/tasks/task.service';
import { TaskFormDialogComponent } from '../../shared/components/dialogs/task-form-dialog/task-form-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TaskCardComponent } from '../../shared/components/cards/task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, TaskCardComponent],
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

  get pendingTasks(): Task[] {
    return this.tasks()
      .filter((task) => !task.completed)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  get completedTasks(): Task[] {
    return this.tasks()
      .filter((task) => task.completed)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  openTaskFormDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      data: task || { title: '', description: '', completed: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && task) {
        this.taskService.updateTask(task.id, { ...task, ...result }).subscribe(() => {
          this.loadTasks();
        });
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
