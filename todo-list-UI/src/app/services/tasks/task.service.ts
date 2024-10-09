import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from '../../core/services/http/http.service';
import { Task, TaskListResponse } from '../../shared/interfaces/task.interface';
import { environment } from '../../../environments/environment';
import { mapUserListResponse } from '../../mappers/user.mapper';

/**
 * `TaskService` provides methods for interacting with the task API, including
 * retrieving, adding, updating, deleting, and toggling the completion status of tasks.
 * It uses `HttpService` for making HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private httpService = inject(HttpService);
  private baseUrl = `${environment.baseUrl}${environment.api}${environment.tasks}`;

  /**
   * Retrieves a list of tasks from the API.
   * 
   * @returns An observable that emits an array of `Task` objects.
   * 
   * @example
   * ```
   * this.taskService.getTasks().subscribe(tasks => {
   *   console.log('Retrieved tasks:', tasks);
   * });
   * ```
   */
  getTasks(): Observable<Task[]> {
    return this.httpService.get<TaskListResponse>(this.baseUrl).pipe(
      map((response: TaskListResponse) => mapUserListResponse(response))
    );
  }

  /**
   * Adds a new task by sending a POST request to the API.
   * 
   * @param task - The `Task` object to add.
   * @returns An observable that emits the added `Task` object.
   * 
   * @example
   * ```
   * const newTask: Task = { id: '3', title: 'New Task', completed: false };
   * this.taskService.addTask(newTask).subscribe(task => {
   *   console.log('Task added:', task);
   * });
   * ```
   */
  addTask(task: Task): Observable<Task> {
    return this.httpService.post<Task>(this.baseUrl, task);
  }

  /**
   * Updates an existing task by sending a PUT request to the API.
   * 
   * @param taskId - The ID of the task to update.
   * @param updatedTask - A partial `Task` object containing the fields to update.
   * @returns An observable that emits the updated `Task` object.
   * 
   * @example
   * ```
   * const updatedTask = { title: 'Updated Task Title' };
   * this.taskService.updateTask(3, updatedTask).subscribe(task => {
   *   console.log('Task updated:', task);
   * });
   * ```
   */
  updateTask(taskId: number, updatedTask: Partial<Task>): Observable<Task> {
    return this.httpService.put<Task>(`${this.baseUrl}/${taskId}`, updatedTask);
  }

  /**
   * Deletes a task by sending a DELETE request to the API.
   * 
   * @param taskId - The ID of the task to delete.
   * @returns An observable that completes when the task is deleted.
   * 
   * @example
   * ```
   * this.taskService.deleteTask(3).subscribe(() => {
   *   console.log('Task deleted');
   * });
   * ```
   */
  deleteTask(taskId: number): Observable<void> {
    return this.httpService.delete<void>(`${this.baseUrl}/${taskId}`);
  }

  /**
   * Toggles the completion status of a task and updates it via a PUT request.
   * 
   * @param task - The `Task` object whose completion status to toggle.
   * @returns An observable that emits the updated `Task` object with the toggled completion status.
   * 
   * @example
   * ```
   * const task: Task = { id: '3', title: 'Task', completed: false };
   * this.taskService.toggleTaskCompletion(task).subscribe(updatedTask => {
   *   console.log('Task completion toggled:', updatedTask);
   * });
   * ```
   */
  toggleTaskCompletion(task: Task): Observable<Task> {
    const updatedTask = { ...task, completed: !task.completed };
    return this.httpService.put<Task>(`${this.baseUrl}/${task.id}`, updatedTask);
  }
}
