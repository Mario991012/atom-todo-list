import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http/http.service';
import { Task } from '../../shared/interfaces/task.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private httpService = inject(HttpService);
  private baseUrl = `${environment.baseUrl}${environment.api}${environment.tasks}`; // Base URL for tasks

  getTasks(): Observable<Task[]> {
    return this.httpService.get<Task[]>(this.baseUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpService.post<Task>(this.baseUrl, task);
  }

  updateTask(taskId: number, updatedTask: Partial<Task>): Observable<Task> {
    return this.httpService.put<Task>(`${this.baseUrl}/${taskId}`, updatedTask);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.httpService.delete<void>(`${this.baseUrl}/${taskId}`);
  }

  toggleTaskCompletion(task: Task): Observable<Task> {
    const updatedTask = { ...task, completed: !task.completed };
    return this.httpService.put<Task>(`${this.baseUrl}/${task.id}`, updatedTask);
  }
}
