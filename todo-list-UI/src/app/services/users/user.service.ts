import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserResponse, LoginUserResponse } from '../../shared/interfaces/user.interface';
import { HttpService } from '../../core/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.baseUrl}${environment.api}${environment.users}`;
  private httpService = inject(HttpService);

  login(email: string): Observable<LoginUserResponse> {
    return this.httpService.get<LoginUserResponse>(`${this.apiUrl}/${email}`);
  }

  createUser(email: string): Observable<CreateUserResponse> {
    return this.httpService.post<CreateUserResponse>(this.apiUrl, { email });
  }
}
