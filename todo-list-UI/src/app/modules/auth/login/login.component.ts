import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginUserResponse } from '../../../shared/interfaces/user.interface';
import { UsersService } from '../../../core/services/users/users.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: UsersService,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.buildForm();
  }

  ngOnInit(): void {
    this.authService.removeToken();
  }

  private buildForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.notificationService.showError('Please enter a valid email address');
      return;
    }

    const email = this.loginForm.value.email;
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login(email).subscribe({
      next: (response: LoginUserResponse) => {
        if (response.returnCode !== 0) {
          const dialogRef = this.dialog.open(ConfirmDialogComponent);
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              return this.createUser(email);
            }
            this.loading.set(false);
          });
        } else {
          this.authService.storeToken(response.data.token);
          this.notificationService.showSuccess('Login successful');
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.showError('Invalid login or user not found');
      },
    });
  }

  private createUser(email: string) {
    this.authService.createUser(email).subscribe({
      next: (response) => {
        this.authService.storeToken(response.data.token);
        this.notificationService.showSuccess('Account created successfully');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.showError('Failed to create an account');
      },
    });
  }
}
