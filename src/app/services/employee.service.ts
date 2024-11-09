import { Injectable } from '@angular/core';
import { Employee } from '../components/employee-details/employee';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeDatatoUpdate: BehaviorSubject<Employee> = new BehaviorSubject<Employee>({email:'', name: '',phone: '', role: ''})

  constructor(){}

  setItem(key: string, value: Employee[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
