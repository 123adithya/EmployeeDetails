import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Employee } from '../employee-details/employee';

@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrl: './display-employees.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayEmployeesComponent{
  @Input() employees!: Employee[];
}
