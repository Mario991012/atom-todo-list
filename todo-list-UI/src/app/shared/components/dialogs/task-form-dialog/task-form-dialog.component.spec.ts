import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskFormDialogComponent } from './task-form-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('TaskFormDialogComponent', () => {
  let component: TaskFormDialogComponent;
  let fixture: ComponentFixture<TaskFormDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TaskFormDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        TaskFormDialogComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { title: '', description: '' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with title and description', () => {
    component.data = { title: 'Test Title', description: 'Test Description' };
    component.taskForm.patchValue({
      title: component.data.title,
      description: component.data.description,
    });
    fixture.detectChanges();

    expect(component.taskForm.get('title')?.value).toBe('Test Title');
    expect(component.taskForm.get('description')?.value).toBe('Test Description');
  });

  it('should close the dialog with form data on submit', () => {
    const formData = { title: 'Test Task', description: 'Test Task Description' };
    component.taskForm.setValue(formData);
    component.onSubmit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(formData);
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should show error message if title is invalid and touched', () => {
    const titleControl = component.taskForm.get('title');
    titleControl?.setValue('');
    titleControl?.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent.trim()).toBe('Title is required');
  });
});
