import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        ConfirmDialogComponent,
      ],
      providers: [{ provide: MatDialogRef, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with false when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true when onConfirm is called', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should trigger onCancel when the Cancel button is clicked', () => {
    spyOn(component, 'onCancel');
    const cancelButton = fixture.debugElement.query(By.css('.cancel-button')).nativeElement;
    cancelButton.click();
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should trigger onConfirm when the Create button is clicked', () => {
    spyOn(component, 'onConfirm');
    const createButton = fixture.debugElement.query(By.css('.create-button')).nativeElement;
    createButton.click();
    expect(component.onConfirm).toHaveBeenCalled();
  });
});
