import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserResponse, LoginUserResponse } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.baseUrl}${environment.api}${environment.users}`;

  constructor(private http: HttpClient) {}

  login(email: string): Observable<LoginUserResponse> {
    return this.http.get<LoginUserResponse>(`${this.apiUrl}/${email}`);
  }

  createUser(email: string): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(this.apiUrl, { email });
  }
}
