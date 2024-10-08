import { Injectable } from '@angular/core';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(private auth: Auth) {}

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  signInWithCustomToken(customToken: string) {
    return from(signInWithCustomToken(this.auth, customToken));
  }

  async loginWithCustomToken(customToken: string) {
    this.signInWithCustomToken(customToken).subscribe({
      next: async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        this.storeToken(token);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
