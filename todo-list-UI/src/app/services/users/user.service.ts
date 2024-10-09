import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserResponse, LoginUserResponse } from '../../shared/interfaces/user.interface';
import { HttpService } from '../../core/services/http/http.service';
import { TokenService } from '../../core/services/token/token.service';

/**
 * `UsersService` provides methods for user authentication and management, 
 * including logging in, creating a user, and retrieving the authenticated user's email.
 * It interacts with the backend API through `HttpService` and manages tokens with `TokenService`.
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.baseUrl}${environment.api}${environment.users}`;
  private httpService = inject(HttpService);
  private tokenService = inject(TokenService);

  /**
   * Logs in a user by sending a GET request to retrieve user information.
   * 
   * @param email - The email of the user attempting to log in.
   * @returns An observable that emits the `LoginUserResponse` containing user information and token.
   * 
   * @example
   * ```
   * this.usersService.login('user@example.com').subscribe(response => {
   *   console.log('User logged in:', response);
   * });
   * ```
   */
  login(email: string): Observable<LoginUserResponse> {
    return this.httpService.get<LoginUserResponse>(`${this.apiUrl}/${email}`);
  }

  /**
   * Creates a new user by sending a POST request with the user's email.
   * 
   * @param email - The email of the user to create.
   * @returns An observable that emits the `CreateUserResponse` containing user creation details.
   * 
   * @example
   * ```
   * this.usersService.createUser('newuser@example.com').subscribe(response => {
   *   console.log('User created:', response);
   * });
   * ```
   */
  createUser(email: string): Observable<CreateUserResponse> {
    return this.httpService.post<CreateUserResponse>(this.apiUrl, { email });
  }

  /**
   * Retrieves the email address of the currently authenticated user 
   * by decoding the stored JWT token.
   * 
   * @returns The email of the authenticated user, or `null` if no token is found or the token is invalid.
   * 
   * @example
   * ```
   * const email = this.usersService.getEmail();
   * if (email) {
   *   console.log('Authenticated user email:', email);
   * } else {
   *   console.log('No user is currently authenticated');
   * }
   * ```
   */
  getEmail(): string | null {
    const decodedToken = this.tokenService.decodeToken();
    if (decodedToken?.email) {
      return decodedToken.email;
    }
    return null;
  }
}
