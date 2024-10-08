import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../../../interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() toggleCompletion = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  onToggleCompletion() {
    this.toggleCompletion.emit(this.task);
  }

  onEditTask() {
    this.editTask.emit(this.task);
  }

  onDeleteTask() {
    this.deleteTask.emit(this.task.id);
  }
}
