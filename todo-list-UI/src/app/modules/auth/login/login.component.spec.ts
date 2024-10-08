import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { UsersService } from '../../../services/users/user.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { TokenService } from '../../../core/services/token/token.service';
import { ConfirmDialogComponent } from '../../../shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { CreateUserResponse, LoginUserResponse } from '../../../shared/interfaces/user.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['login', 'createUser']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['loginWithCustomToken', 'removeToken']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showError', 'showSuccess']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        LoginComponent,
      ],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if form is invalid and submitted', () => {
    component.onSubmit();
    expect(notificationServiceSpy.showError).toHaveBeenCalledWith('Please enter a valid email address');
  });

  it('should call login and handle successful login', async () => {
    const mockResponse: LoginUserResponse = {
      returnCode: 0,
      data: { id: '123', email: 'test@example.com', disabled: false, token: 'abc123' },
    };

    usersServiceSpy.login.and.returnValue(of(mockResponse));
    component.loginForm.setValue({ email: 'test@example.com' });

    await component.onSubmit();
    expect(usersServiceSpy.login).toHaveBeenCalledWith('test@example.com');
    expect(tokenServiceSpy.loginWithCustomToken).toHaveBeenCalledWith('abc123');
    expect(notificationServiceSpy.showSuccess).toHaveBeenCalledWith('Login successful of test@example.com');
  });

  it('should create a new user when dialog confirms account creation', () => {
    const mockLoginResponse: LoginUserResponse = {
      returnCode: 1,
      data: { id: '', email: 'test@example.com', disabled: false, token: '' },
    };
    const mockCreateUserResponse: CreateUserResponse = {
      returnCode: 0,
      data: { id: '123', email: 'test@example.com', token: 'newToken123', disabled: false },
    };

    usersServiceSpy.login.and.returnValue(of(mockLoginResponse));
    usersServiceSpy.createUser.and.returnValue(of(mockCreateUserResponse));
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<ConfirmDialogComponent>);

    component.loginForm.setValue({ email: 'test@example.com' });
    component.onSubmit();

    expect(usersServiceSpy.createUser).toHaveBeenCalledWith('test@example.com');
    expect(tokenServiceSpy.loginWithCustomToken).toHaveBeenCalledWith('newToken123');
    expect(notificationServiceSpy.showSuccess).toHaveBeenCalledWith('Account created successfully');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error message when login fails', () => {
    usersServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.loginForm.setValue({ email: 'invalid@example.com' });
    component.onSubmit();

    expect(usersServiceSpy.login).toHaveBeenCalledWith('invalid@example.com');
    expect(notificationServiceSpy.showError).toHaveBeenCalledWith('Invalid login or user not found');
  });
});
