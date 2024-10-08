import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { decodeToken, tokenIsExpired } from '../utils/jwt.utils';
import { JWTDecoded } from '../../shared/interfaces/jwt-token.interface';

describe('authGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should navigate to login and return false if no token is found', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    TestBed.runInInjectionContext(() => {
      const result = authGuard(null as any, null as any);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      expect(result).toBeFalse();
    });
  });

  it('should navigate to login and return false if the token is expired', () => {
    const mockToken = 'mockToken';
    const mockDecodedToken: JWTDecoded = {
      aud: '',
      iat: 213871,
      iss: '',
      sub: '',
      uid: '',
      exp: Date.now() / 1000 - 3600
    };

    TestBed.runInInjectionContext(() => {
      const result = authGuard(null as any, null as any);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      expect(result).toBeFalse();
    });
  });

  it('should return true if the token is valid and not expired', () => {
    const mockToken = 'mockToken';
    const mockDecodedToken: JWTDecoded = {
      aud: '',
      iat: 213871,
      iss: '',
      sub: '',
      uid: '',
      exp: undefined
    };

    spyOn(localStorage, 'getItem').and.returnValue(mockToken);

    TestBed.runInInjectionContext(() => {
      const result = authGuard(null as any, null as any);
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      expect(result).toBeTrue();
    });
  });
});
