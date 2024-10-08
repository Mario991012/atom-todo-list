import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { Auth } from '@angular/fire/auth';
import { from, of, throwError } from 'rxjs';
import { signInWithCustomToken } from '@angular/fire/auth';

describe('TokenService', () => {
  let service: TokenService;
  let authMock: jasmine.SpyObj<Auth>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('Auth', ['']);

    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: Auth, useValue: authSpy },
      ],
    });

    service = TestBed.inject(TokenService);
    authMock = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;

    spyOn<any>(signInWithCustomToken, 'call').and.callFake(() => {
      return from(Promise.resolve({
        user: {
          getIdToken: () => Promise.resolve('mockIdToken')
        }
      }));
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('storeToken', () => {
    it('should store token in localStorage', () => {
      const token = 'abc123';
      spyOn(localStorage, 'setItem');
      service.storeToken(token);
      expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    });
  });

  describe('removeToken', () => {
    it('should remove token from localStorage', () => {
      spyOn(localStorage, 'removeItem');
      service.removeToken();
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      const token = 'abc123';
      spyOn(localStorage, 'getItem').and.returnValue(token);
      expect(service.getToken()).toBe(token);
    });

    it('should return null if no token is found in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.getToken()).toBeNull();
    });
  });

  describe('signInWithCustomToken', () => {
    it('should call signInWithCustomToken and return userCredential', (done: DoneFn) => {
      const customToken = 'customToken';
      const userCredentialMock: any = {
        user: {
          getIdToken: jasmine.createSpy().and.returnValue(Promise.resolve('mockIdToken')),
        },
      };

      spyOn(service, 'signInWithCustomToken').and.returnValue(of(userCredentialMock));

      service.signInWithCustomToken(customToken).subscribe({
        next: (userCredential) => {
          expect(service.signInWithCustomToken).toHaveBeenCalledWith(customToken);
          expect(userCredential).toEqual(userCredentialMock);
          done();
        },
      });
    });
  });

  describe('loginWithCustomToken', () => {
    it('should store token after successful login', (done: DoneFn) => {
      const customToken = 'customToken';
      const mockToken = 'mockIdToken';
      const userCredentialMock: any = {
        user: {
          getIdToken: jasmine.createSpy().and.returnValue(Promise.resolve(mockToken)),
        },
      };

      spyOn(service, 'storeToken');
      spyOn(service, 'signInWithCustomToken').and.returnValue(of(userCredentialMock));

      service.loginWithCustomToken(customToken);

      setTimeout(() => {
        expect(userCredentialMock.user.getIdToken).toHaveBeenCalled();
        expect(service.storeToken).toHaveBeenCalledWith(mockToken);
        done();
      }, 0);
    });

    it('should handle login errors', () => {
      const customToken = 'customToken';
      const consoleSpy = spyOn(console, 'error');
      spyOn(service, 'signInWithCustomToken').and.returnValue(throwError(() => new Error('Login failed')));

      service.loginWithCustomToken(customToken);
      expect(consoleSpy).toHaveBeenCalledWith('Login failed', jasmine.any(Error));
    });
  });
});
