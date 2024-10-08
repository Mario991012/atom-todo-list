import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('should send a GET request and return data', () => {
      const mockData = { id: 1, name: 'Test' };
      const url = 'https://api.example.com/data';

      service.get<any>(url).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });
  });

  describe('POST', () => {
    it('should send a POST request and return data', () => {
      const mockData = { id: 1, name: 'Test' };
      const url = 'https://api.example.com/data';

      service.post<any>(url, mockData).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockData);
      req.flush(mockData);
    });
  });

  describe('PUT', () => {
    it('should send a PUT request and return data', () => {
      const mockData = { id: 1, name: 'Updated Test' };
      const url = 'https://api.example.com/data/1';

      service.put<any>(url, mockData).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockData);
      req.flush(mockData);
    });
  });

  describe('DELETE', () => {
    it('should send a DELETE request and return data', () => {
      const url = 'https://api.example.com/data/1';

      service.delete<any>(url).subscribe((data) => {
        expect(data).toEqual({});
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
