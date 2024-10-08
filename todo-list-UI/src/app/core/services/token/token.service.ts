import { Injectable } from '@angular/core';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { from } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  decodeToken(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
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
