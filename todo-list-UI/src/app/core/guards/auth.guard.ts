import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tokenIsExpired, decodeToken } from '../utils/jwt.utils';

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
