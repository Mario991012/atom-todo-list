import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskService } from '../../services/tasks/task.service';
import { TaskFormDialogComponent } from '../../shared/components/dialogs/task-form-dialog/task-form-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TaskBoardComponent } from '../../shared/components/boards/task-board/task-board.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TaskBoardComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DashboardComponent {
  tasks = signal<Task[]>([]);
  filterTitle = signal<string>('');
  filterDescription = signal<string>('');

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

  getTasksByStatus(completed: boolean) {
    return this.tasks()
    .filter((task) => completed ? task.completed : !task.completed)
    .filter(
      (task) =>
        task.title.toLowerCase().includes(this.filterTitle().toLowerCase()) &&
        task.description
          .toLowerCase()
          .includes(this.filterDescription().toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  onTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterTitle.set(input.value);
  }

  onDescriptionInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterDescription.set(input.value);
  }

  openTaskFormDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      data: task || { title: '', description: '', completed: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && task) {
        this.taskService
          .updateTask(task.id, { ...task, ...result })
          .subscribe(() => {
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
