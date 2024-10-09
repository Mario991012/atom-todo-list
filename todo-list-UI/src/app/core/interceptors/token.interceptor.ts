import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';

/**
 * `tokenInterceptor` is an HTTP interceptor that adds an `Authorization` header 
 * to outgoing HTTP requests if a JWT token is available.
 * The token is retrieved from the `TokenService`, and if present, 
 * it is included in the `Authorization` header of the cloned request.
 * If no token is available, the original request proceeds without modification.
 * 
 * @param req - The outgoing HTTP request.
 * @param next - The next handler in the chain, responsible for sending the request.
 * @returns An observable of the HTTP event, potentially modified to include the `Authorization` header.
 * 
 * @example
 * Usage in an Angular module:
 * 
 * ```
 * export const appConfig: ApplicationConfig = {
 *  providers: [
 *    provideHttpClient(withInterceptors([tokenInterceptor])),
 *  ],
};
 * ```
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
