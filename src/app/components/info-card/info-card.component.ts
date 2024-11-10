import { Component, Input, ViewChild } from '@angular/core';
import { Employee } from '../employee-details/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../reusabel/modal/modal.component';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
@ViewChild('confirmationModal') confirmationModal!: ModalComponent;
@Input() uEmployee!: Employee;

constructor(private service: EmployeeService, private router: Router){}

editEmployeeDetails(){
  this.service.employeeDatatoUpdate.next(this.uEmployee);
  this.router.navigate(['/overview']);
}

deleteEmployee(){
  this.confirmationModal.open();
  
}

handleOk(): void {
  this.service.removeEmployee(this.uEmployee);
}

handleCancel(): void {}
}
