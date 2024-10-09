import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * `HttpService` provides methods for making HTTP requests with error handling.
 * It serves as a wrapper around Angular's `HttpClient` to streamline GET, POST, PUT, and DELETE requests.
 * All HTTP methods include error handling via `handleError`, which processes both client-side and server-side errors.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  /**
   * Handles HTTP errors by categorizing them into client-side and server-side errors.
   * Logs the error message to the console and returns an observable with a user-friendly error message.
   * 
   * @param error - The `HttpErrorResponse` returned from the HTTP request.
   * @returns An observable that throws an error with a descriptive message.
   */
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

  /**
   * Makes a GET request to the specified URL.
   * 
   * @param url - The URL to send the GET request to.
   * @param options - Optional HTTP headers.
   * @returns An observable containing the response data.
   * 
   * @example
   * ```
   * this.httpService.get<User>('https://api.example.com/users')
   *   .subscribe(user => console.log(user));
   * ```
   */
  get<T>(url: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  /**
   * Makes a POST request to the specified URL.
   * 
   * @param url - The URL to send the POST request to.
   * @param body - The request body to send.
   * @param options - Optional HTTP headers.
   * @returns An observable containing the response data.
   * 
   * @example
   * ```
   * this.httpService.post<User>('https://api.example.com/users', { name: 'John Doe' })
   *   .subscribe(response => console.log(response));
   * ```
   */
  post<T>(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(catchError(this.handleError));
  }

  /**
   * Makes a PUT request to the specified URL.
   * 
   * @param url - The URL to send the PUT request to.
   * @param body - The request body to send.
   * @param options - Optional HTTP headers.
   * @returns An observable containing the response data.
   * 
   * @example
   * ```
   * this.httpService.put<User>('https://api.example.com/users/1', { name: 'Jane Doe' })
   *   .subscribe(response => console.log(response));
   * ```
   */
  put<T>(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.put<T>(url, body, options).pipe(catchError(this.handleError));
  }

  /**
   * Makes a DELETE request to the specified URL.
   * 
   * @param url - The URL to send the DELETE request to.
   * @param options - Optional HTTP headers.
   * @returns An observable containing the response data.
   * 
   * @example
   * ```
   * this.httpService.delete<User>('https://api.example.com/users/1')
   *   .subscribe(response => console.log(response));
   * ```
   */
  delete<T>(url: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.delete<T>(url, options).pipe(catchError(this.handleError));
  }
}
