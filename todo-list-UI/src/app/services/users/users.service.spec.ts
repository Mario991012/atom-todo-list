import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { CreateUserResponse, LoginUserResponse } from '../../shared/interfaces/user.interface';
import { environment } from '../../../environments/environment';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call login API and return LoginUserResponse', () => {
      const mockResponse: LoginUserResponse = {
        returnCode: 0,
        data: { id: '123', email: 'test@example.com', disabled: false, token: 'abc123' },
      };

      const email = 'test@example.com';

      service.login(email).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.api}${environment.users}/${email}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('createUser', () => {
    it('should call createUser API and return CreateUserResponse', () => {
      const mockResponse: CreateUserResponse = {
        returnCode: 0,
        data: { id: '123', email: 'newuser@example.com', token: 'newToken123', disabled: false },
      };

      const email = 'newuser@example.com';

      service.createUser(email).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.api}${environment.users}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email });
      req.flush(mockResponse);
    });
  });

});
