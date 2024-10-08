import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginUserResponse } from '../../../shared/interfaces/user.interface';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../services/users/user.service';
import { TokenService } from '../../../core/services/token/token.service';

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
    NgOptimizedImage,
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
    private userService: UsersService,
    private tokenService: TokenService,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.buildForm();
  }

  ngOnInit(): void {
    this.tokenService.removeToken();
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

    const email = this.loginForm.getRawValue().email;
    this.loading.set(true);
    this.errorMessage.set('');

    this.userService.login(email).subscribe({
      next: async (response: LoginUserResponse) => {
        if (response.returnCode !== 0) {
          const dialogRef = this.dialog.open(ConfirmDialogComponent);
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              return this.createUser(email);
            }
            this.loading.set(false);
          });
        } else {
          await this.tokenService.loginWithCustomToken(response.data.token);
          this.notificationService.showSuccess(`Login successful of ${response.data.email}`);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 500);
        }
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.showError('Invalid login or user not found');
      },
    });
  }

  private createUser(email: string) {
    this.userService.createUser(email).subscribe({
      next: (response) => {
        this.tokenService.loginWithCustomToken(response.data.token);
        this.notificationService.showSuccess('Account created successfully');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.showError('Failed to create an account');
      },
    });
  }
}
