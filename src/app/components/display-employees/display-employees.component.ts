import { Component, Input } from '@angular/core';
import { Employee } from '../employee-details/employee';

@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrl: './display-employees.component.scss'
})
export class DisplayEmployeesComponent{
  @Input() employees!: Employee[];
}
