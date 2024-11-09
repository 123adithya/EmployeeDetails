import { Component, Input } from '@angular/core';
import { Employee } from '../employee-details/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {

@Input() uEmployee!: Employee;

constructor(private service: EmployeeService, private router: Router){}

editEmployeeDetails(){
  this.service.employeeDatatoUpdate.next(this.uEmployee);
  this.router.navigate(['/overview']);
}
}
