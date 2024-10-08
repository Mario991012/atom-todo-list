import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserResponse, LoginUserResponse } from '../../shared/interfaces/user.interface';
import { HttpService } from '../../core/services/http/http.service';
import { TokenService } from '../../core/services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.baseUrl}${environment.api}${environment.users}`;
  private httpService = inject(HttpService);
  private tokenService = inject(TokenService);

  login(email: string): Observable<LoginUserResponse> {
    return this.httpService.get<LoginUserResponse>(`${this.apiUrl}/${email}`);
  }

  createUser(email: string): Observable<CreateUserResponse> {
    return this.httpService.post<CreateUserResponse>(this.apiUrl, { email });
  }

  getEmail(): string | null {
    const decodedToken = this.tokenService.decodeToken();
    if (decodedToken?.email) {
      return decodedToken.email;
    }
    return null;
  }
}
