import { RETURN_CODES } from './../../../../../todo-list-API/src/common/constants/common';
import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpService } from '../../core/services/http/http.service';
import { of } from 'rxjs';
import { Task, TaskListResponse } from '../../shared/interfaces/task.interface';
import { mapUserListResponse } from '../../mappers/user.mapper';

describe('TaskService', () => {
  let service: TaskService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: HttpService, useValue: httpSpy },
      ],
    });

    service = TestBed.inject(TaskService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should return a list of tasks', () => {
      const mockResponse: TaskListResponse = {
        returnCode: RETURN_CODES.GENERIC_ERROR,
        data: [
          { id: 1, title: 'Test Task 1', description: 'Description 1', createdAt: new Date(), completed: false },
          { id: 2, title: 'Test Task 2', description: 'Description 2', createdAt: new Date(), completed: true },
        ],
      };
      const mappedTasks = mapUserListResponse(mockResponse);

      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getTasks().subscribe((tasks) => {
        expect(tasks).toEqual(mappedTasks);
      });

      expect(httpServiceSpy.get).toHaveBeenCalledWith(service['baseUrl']);
    });
  });

  describe('addTask', () => {
    it('should add a task and return the added task', () => {
      const newTask: Task = { id: 3, title: 'New Task', description: 'New Task Description', createdAt: new Date(), completed: false };

      httpServiceSpy.post.and.returnValue(of(newTask));

      service.addTask(newTask).subscribe((task) => {
        expect(task).toEqual(newTask);
      });

      expect(httpServiceSpy.post).toHaveBeenCalledWith(service['baseUrl'], newTask);
    });
  });

  describe('updateTask', () => {
    it('should update a task and return the updated task', () => {
      const updatedTask: Task = { id: 1, title: 'Updated Task', description: 'Updated Description', createdAt: new Date(), completed: false };

      httpServiceSpy.put.and.returnValue(of(updatedTask));

      service.updateTask(updatedTask.id, updatedTask).subscribe((task) => {
        expect(task).toEqual(updatedTask);
      });

      expect(httpServiceSpy.put).toHaveBeenCalledWith(`${service['baseUrl']}/${updatedTask.id}`, updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', () => {
      const taskId = 1;

      httpServiceSpy.delete.and.returnValue(of(undefined));

      service.deleteTask(taskId).subscribe(() => {
        expect(httpServiceSpy.delete).toHaveBeenCalledWith(`${service['baseUrl']}/${taskId}`);
      });
    });
  });

  describe('toggleTaskCompletion', () => {
    it('should toggle the completion status of a task and return the updated task', () => {
      const task: Task = { id: 1, title: 'Task', description: 'Task Description', createdAt: new Date(), completed: false };
      const updatedTask = { ...task, completed: true };

      httpServiceSpy.put.and.returnValue(of(updatedTask));

      service.toggleTaskCompletion(task).subscribe((result) => {
        expect(result).toEqual(updatedTask);
      });

      expect(httpServiceSpy.put).toHaveBeenCalledWith(`${service['baseUrl']}/${task.id}`, updatedTask);
    });
  });
});
