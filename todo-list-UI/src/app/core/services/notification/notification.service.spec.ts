import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: spy },
      ],
    });

    service = TestBed.inject(NotificationService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showSuccess', () => {
    it('should call MatSnackBar with success message', () => {
      const message = 'Success message';
      service.showSuccess(message);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      });
    });
  });

  describe('showError', () => {
    it('should call MatSnackBar with error message', () => {
      const message = 'Error message';
      service.showError(message);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    });
  });

  describe('showInfo', () => {
    it('should call MatSnackBar with info message', () => {
      const message = 'Info message';
      service.showInfo(message);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['info-snackbar'],
      });
    });
  });
});
