import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoadEmployeesService } from './load-employees.service';
import { EmployeeService } from './employee.service';
import { EmployeeDataStorage } from './LocalStorageKeys';

describe('LoadEmployeesService', () => {
  let service: LoadEmployeesService;
  let httpMock: HttpTestingController;
  let employeeService: EmployeeService;

  const mockEmployeeData = {
    employees: [
      { email: 'john@example.com', name: 'John Doe', phone: '1234567890', role: 'Developer' },
      { email: 'jane@example.com', name: 'Jane Smith', phone: '0987654321', role: 'Manager' },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadEmployeesService, EmployeeService],
    });

    service = TestBed.inject(LoadEmployeesService);
    httpMock = TestBed.inject(HttpTestingController);
    employeeService = TestBed.inject(EmployeeService);

    spyOn(employeeService, 'setEmployeeDetails').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data from the API and update the employee service', (done) => {
    service.loadData().then((data) => {
      expect(service['cachedData']).toEqual(mockEmployeeData);
      expect(employeeService.setEmployeeDetails).toHaveBeenCalledWith(
        EmployeeDataStorage.setEmployees,
        mockEmployeeData.employees
      );
      done();
    });

    const req = httpMock.expectOne('assets/data/employees-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployeeData);
  });

  it('should return cached data from getData() after loading', (done) => {
    service.loadData().then(() => {
      service.getData().subscribe((data) => {
        expect(data).toEqual(mockEmployeeData);
        done();
      });
    });
    const req = httpMock.expectOne('assets/data/employees-data.json');
    req.flush(mockEmployeeData);
  });

  it('should load data only once and use cache', (done) => {
    service.loadData().then(() => {
      service.loadData().then(() => {
        httpMock.expectNone('assets/data/employees-data.json');
        expect(service['cachedData']).toEqual(mockEmployeeData);
        done();
      });
    });
    const req = httpMock.expectOne('assets/data/employees-data.json');
    req.flush(mockEmployeeData);
  });
});