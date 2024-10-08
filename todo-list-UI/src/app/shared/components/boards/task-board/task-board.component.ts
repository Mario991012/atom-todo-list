import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../../cards/task-card/task-card.component';
import { Task } from '../../../interfaces/task.interface';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  imports: [CommonModule, TaskCardComponent],
})
export class TaskBoardComponent {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];

  @Output() toggleCompletion = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  onToggleCompletion(task: Task) {
    this.toggleCompletion.emit(task);
  }

  onEditTask(task: Task) {
    this.editTask.emit(task);
  }

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task.id);
  }
}
