import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { EmployeeDataStorage } from './LocalStorageKeys';

describe('EmployeeService', () => {
  let service: EmployeeService;
  const mockEmployees = [
    { email: 'john@example.com', name: 'John Doe', phone: '1234567890', role: 'Developer' },
    { email: 'jane@example.com', name: 'Jane Smith', phone: '0987654321', role: 'Manager' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService],
    });

    service = TestBed.inject(EmployeeService);
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'clear');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set employee details and update the employees subject', () => {
    const key = EmployeeDataStorage.setEmployees;
    service.setEmployeeDetails(key, mockEmployees);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(mockEmployees));
    service.getEmployeeDetails(key).subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });
  });

  it('should return employee details as an observable', () => {
    const key = EmployeeDataStorage.setEmployees;
    service.setEmployeeDetails(key, mockEmployees);
    service.getEmployeeDetails(key).subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });
  });

  it('should remove an employee and update localStorage and employeesSubject', () => {
    const key = EmployeeDataStorage.setEmployees;
    service.setEmployeeDetails(key, mockEmployees);
    const employeeToRemove = mockEmployees[0];
    spyOn(service, 'setEmployeeDetails');

    service.removeEmployee(employeeToRemove);
    const updatedEmployees = mockEmployees.filter((emp) => emp.email !== employeeToRemove.email);
    expect(service.setEmployeeDetails).toHaveBeenCalledWith(key, updatedEmployees);
  });

  it('should clear localStorage', () => {
    service.clear();
    expect(localStorage.clear).toHaveBeenCalled();
  });

});