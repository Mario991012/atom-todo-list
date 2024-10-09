import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TaskService } from '../../services/tasks/task.service';
import { DashboardComponent } from './dashboard.component';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskBoardComponent } from '../../shared/components/boards/task-board/task-board.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from '../../core/services/token/token.service';
import { Auth } from '@angular/fire/auth';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let authSpy: jasmine.SpyObj<Auth>;

  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', createdAt: new Date(), completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', createdAt: new Date(), completed: true },
  ];

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'addTask', 'updateTask', 'deleteTask', 'toggleTaskCompletion']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken', 'removeToken', 'decodeToken']);
    authSpy = jasmine.createSpyObj('Auth', ['signInWithCustomToken']);

    taskServiceSpy.getTasks.and.returnValue(of(mockTasks));

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        TaskBoardComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: Auth, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    component.loadTasks();
    fixture.detectChanges();
    expect(taskServiceSpy.getTasks).toHaveBeenCalled();
    expect(component.tasks()).toEqual(mockTasks);
  });

  it('should navigate to login on logout', () => {
    component.logout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should filter tasks by title and description', () => {
    component.filterTitle.set('Task 1');
    component.filterDescription.set('Description 1');

    const filteredTasks = component.getTasksByStatus(false);
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].title).toBe('Task 1');
    expect(filteredTasks[0].description).toBe('Description 1');
  });

  it('should delete a task', () => {
    const taskId = mockTasks[0].id;
    taskServiceSpy.deleteTask.and.returnValue(of());

    component.deleteTask(taskId);
    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(taskId);
  });

  it('should toggle task completion', () => {
    const taskToToggle = mockTasks[0];
    taskServiceSpy.toggleTaskCompletion.and.returnValue(of({ ...taskToToggle, completed: !taskToToggle.completed }));

    component.toggleTaskCompletion(taskToToggle);
    expect(taskServiceSpy.toggleTaskCompletion).toHaveBeenCalledWith(taskToToggle);
  });
});
