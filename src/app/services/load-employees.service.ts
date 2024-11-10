import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeeDataStorage } from './LocalStorageKeys';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class LoadEmployeesService {
  
  private apiUrl = 'assets/data/employees-data.json';

  constructor(private http: HttpClient, private uEmployeeService: EmployeeService) {}

  
  private cachedData: any = null;

  loadData(): Promise<any> {
    if (this.cachedData) {
      return Promise.resolve(this.cachedData);
    }

    return this.http.get<any>(this.apiUrl).toPromise().then((data) => {
      this.cachedData = data;
      this.uEmployeeService.setEmployeeDetails(EmployeeDataStorage.setEmployees, data.employees);
      return data;
    });
  }

  getData(): Observable<any> {
    return of(this.cachedData);
  }
}
