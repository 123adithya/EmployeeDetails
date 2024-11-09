import { Component } from '@angular/core';
import { LoadEmployeesService } from './services/load-employees.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeDataStorage } from './services/LocalStorageKeys';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private uLoadEmployeeService: LoadEmployeesService, private uEmployeeService: EmployeeService){
    this.uLoadEmployeeService.getData().subscribe((data:any) =>  this.uEmployeeService.setItem(EmployeeDataStorage.setEmployees, data.employees));
  }
}
