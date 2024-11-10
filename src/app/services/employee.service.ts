import { Injectable } from '@angular/core';
import { Employee } from '../components/employee-details/employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeDataStorage } from './LocalStorageKeys';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeDatatoUpdate: BehaviorSubject<Employee> = new BehaviorSubject<Employee>({email:'', name: '',phone: '', role: ''});
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  constructor(){}

  setEmployeeDetails(key: string, value: Employee[]): void {
    localStorage.setItem(key, JSON.stringify(value));
    this.employeesSubject.next(value);
  }

  getEmployeeDetails(key: string): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  removeEmployee(employee: Employee): void {
    const localKey = EmployeeDataStorage.setEmployees;
    const currentEmployees = this.employeesSubject.value;
    const updatedEmployees = currentEmployees.filter(emp => emp.email !== employee.email);
    this.setEmployeeDetails(localKey,updatedEmployees);
  }

  clear(): void {
    localStorage.clear();
  }
}
