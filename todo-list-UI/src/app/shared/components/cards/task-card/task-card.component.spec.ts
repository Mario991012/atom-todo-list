import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Task } from '../../../interfaces/task.interface';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let task: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskCardComponent,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    task = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      createdAt: new Date().getTime(),
      completed: false,
    };

    component.task = task;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title and description', () => {
    const titleElement: DebugElement = fixture.debugElement.query(
      By.css('.task-title')
    );
    const descriptionElement: DebugElement = fixture.debugElement.query(
      By.css('.task-description')
    );

    expect(titleElement.nativeElement.textContent.trim()).toBe(task.title);
    expect(descriptionElement.nativeElement.textContent.trim()).toBe(
      task.description
    );
  });

  it('should emit toggleCompletion when checkbox is clicked', () => {
    spyOn(component.toggleCompletion, 'emit');
    const checkboxElement: DebugElement = fixture.debugElement.query(
      By.css('mat-checkbox')
    );

    checkboxElement.triggerEventHandler('change', null);
    expect(component.toggleCompletion.emit).toHaveBeenCalledWith(task);
  });

  it('should emit editTask when Edit button is clicked', () => {
    spyOn(component.editTask, 'emit');
    const editButton: DebugElement = fixture.debugElement.query(
      By.css('button[color="primary"]')
    );

    editButton.triggerEventHandler('click', null);
    expect(component.editTask.emit).toHaveBeenCalledWith(task);
  });

  it('should emit deleteTask when Delete button is clicked', () => {
    spyOn(component.deleteTask, 'emit');
    const deleteButton: DebugElement = fixture.debugElement.query(
      By.css('button[color="warn"]')
    );

    deleteButton.triggerEventHandler('click', null);
    expect(component.deleteTask.emit).toHaveBeenCalledWith(task.id);
  });

  it('should display "Completed" if task is completed', () => {
    component.task.completed = true;
    fixture.detectChanges();

    const checkboxElement: DebugElement = fixture.debugElement.query(
      By.css('mat-checkbox')
    );
    expect(checkboxElement.nativeElement.textContent.trim()).toBe('Completed');
  });

  it('should display "Pending" if task is not completed', () => {
    component.task.completed = false;
    fixture.detectChanges();

    const checkboxElement: DebugElement = fixture.debugElement.query(
      By.css('mat-checkbox')
    );
    expect(checkboxElement.nativeElement.textContent.trim()).toBe('Pending');
  });
});
