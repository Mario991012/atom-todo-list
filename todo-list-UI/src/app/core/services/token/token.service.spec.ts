import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenService],
    });
    service = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
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
});
