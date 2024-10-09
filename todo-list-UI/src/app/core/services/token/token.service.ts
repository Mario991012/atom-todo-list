import { Injectable } from '@angular/core';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { from } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

/**
 * `TokenService` manages JWT tokens for authentication, including storing, retrieving, 
 * decoding tokens, and logging in with custom tokens using Firebase authentication.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  /**
   * Constructs the `TokenService` with Firebase `Auth` service injected.
   * 
   * @param auth - The `Auth` instance for interacting with Firebase authentication.
   */
  constructor(private auth: Auth) {}

  /**
   * Stores the provided JWT token in the browser's local storage.
   * 
   * @param token - The JWT token to store.
   * 
   * @example
   * ```
   * this.tokenService.storeToken('your-jwt-token');
   * ```
   */
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Removes the JWT token from the browser's local storage.
   * 
   * @example
   * ```
   * this.tokenService.removeToken();
   * ```
   */
  removeToken(): void {
    localStorage.removeItem('token');
  }

  /**
   * Retrieves the JWT token from the browser's local storage.
   * 
   * @returns The stored JWT token, or `null` if no token is found.
   * 
   * @example
   * ```
   * const token = this.tokenService.getToken();
   * ```
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Decodes the stored JWT token and returns its payload.
   * 
   * @returns The decoded token payload, or `null` if no token is found or decoding fails.
   * 
   * @example
   * ```
   * const decodedToken = this.tokenService.decodeToken();
   * ```
   */
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

  /**
   * Logs in a user using a custom Firebase token and returns an observable of the result.
   * 
   * @param customToken - The custom token to authenticate with.
   * @returns An observable that emits the result of the sign-in process.
   * 
   * @example
   * ```
   * this.tokenService.signInWithCustomToken('your-custom-token').subscribe({
   *   next: (userCredential) => console.log('User signed in', userCredential),
   *   error: (error) => console.error('Sign-in failed', error),
   * });
   * ```
   */
  signInWithCustomToken(customToken: string) {
    return from(signInWithCustomToken(this.auth, customToken));
  }

  /**
   * Asynchronously logs in a user using a custom Firebase token, retrieves an ID token,
   * and stores it in local storage.
   * 
   * @param customToken - The custom token to authenticate with.
   * 
   * @example
   * ```
   * await this.tokenService.loginWithCustomToken('your-custom-token');
   * ```
   */
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
