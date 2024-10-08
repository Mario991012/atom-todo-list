import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserResponse, LoginUserResponse } from '../../../shared/interfaces/user.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.baseUrl}${environment.api}${environment.users}`;

  constructor(private http: HttpClient) {}

  login(email: string): Observable<LoginUserResponse> {
    return this.http.get<LoginUserResponse>(`${this.apiUrl}/${email}`);
  }

  createUser(email: string): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(this.apiUrl, { email });
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
