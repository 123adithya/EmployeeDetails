import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee-details/employee';
import { EmployeeDataStorage } from '../../services/LocalStorageKeys';

@Component({
  selector: 'app-edit-employee-details',
  templateUrl: './edit-employee-details.component.html',
  styleUrl: './edit-employee-details.component.scss'
})
export class EditEmployeeDetailsComponent implements OnInit{
  
  employee!: Employee;
  employeesArray!: Employee[];
  constructor(private service: EmployeeService){}

  ngOnInit(): void {
    this.service.employeeDatatoUpdate.subscribe((employee: Employee)=> this.employee = employee);
  }

  onSubmit() {
    this.employeesArray = this.service.getItem(EmployeeDataStorage.setEmployees);
    this.employeesArray = this.employeesArray.map(employee => 
      employee.email === this.employee.email ? this.employee : employee
    );
    this.service.setItem(EmployeeDataStorage.setEmployees, this.employeesArray)
    alert('Updated Succesfully');
  }
}
