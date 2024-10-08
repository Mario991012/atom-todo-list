import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginUserResponse } from '../../../shared/interfaces/user.interface';

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
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please enter a valid email address', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    const email = this.loginForm.getRawValue().email;
    this.loading.set(true);
    this.errorMessage.set('');

    this.http.get<LoginUserResponse>(`https://api-q2qsitwd6a-uc.a.run.app/api/users/${email}`).subscribe({
      next: (response: any) => {
        if (response.returnCode !== 0) {
          this.snackBar.open(response.error?.message || 'Login failed', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.loading.set(false);
        } else {
          // If returnCode is 0, proceed with login
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Invalid login or user not found');
        this.snackBar.open('Invalid login or user not found', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }
}
