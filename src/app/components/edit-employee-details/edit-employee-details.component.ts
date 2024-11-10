import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee-details/employee';
import { EmployeeDataStorage } from '../../services/LocalStorageKeys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee-details',
  templateUrl: './edit-employee-details.component.html',
  styleUrl: './edit-employee-details.component.scss'
})
export class EditEmployeeDetailsComponent implements OnInit{
  
  employee!: Employee;
  employeesArray!: Employee[];
  constructor(private service: EmployeeService,  private router: Router){}

  ngOnInit(): void {
    this.service.employeeDatatoUpdate.subscribe((employee: Employee)=> this.employee = employee);
  }

  onSubmit() {
    this.service.getEmployeeDetails(EmployeeDataStorage.setEmployees).subscribe(data => this.employeesArray = data);
    this.employeesArray = this.employeesArray.map(employee => 
      employee.email === this.employee.email ? this.employee : employee
    );
    this.service.setEmployeeDetails(EmployeeDataStorage.setEmployees, this.employeesArray)
    alert('Updated Succesfully');
    this.router.navigate(['/filter-employees']);
  }
}
