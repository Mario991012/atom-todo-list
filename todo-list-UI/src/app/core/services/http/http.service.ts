import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  
  get<T>(url: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.put<T>(url, body, options).pipe(catchError(this.handleError));
  }

  delete<T>(url: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.delete<T>(url, options).pipe(catchError(this.handleError));
  }
}
