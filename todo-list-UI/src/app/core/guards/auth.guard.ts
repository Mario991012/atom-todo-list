import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tokenIsExpired, decodeToken } from '../utils/jwt.utils';

/**
 * `authGuard` is a route guard that checks for the presence and validity of a JWT token.
 * It verifies if the token exists in `localStorage`, decodes it, and checks for expiration.
 * If the token is missing or expired, the user is redirected to the login page.
 * Otherwise, it allows access to the requested route.
 * 
 * @param route - The activated route snapshot containing route information.
 * @param state - The router state snapshot containing the URL and navigation state.
 * @returns A boolean indicating if the route can be activated (`true` if allowed, `false` if not).
 * 
 * @example
 * Usage in a route definition:
 * 
 * ```
 * {
 *   path: 'dashboard',
 *   component: DashboardComponent,
 *   canActivate: [authGuard]
 * }
 * ```
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const token = localStorage.getItem('token');
  
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const decodedToken = decodeToken(token);
  const isTokenExpired = tokenIsExpired(decodedToken);

  if (isTokenExpired) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
