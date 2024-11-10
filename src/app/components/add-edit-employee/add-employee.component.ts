import { Component } from '@angular/core';
import { Employee, ValidationRules } from '../employee-details/employee';
import { FormGroup, FormControl, FormBuilder  } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDataStorage } from '../../services/LocalStorageKeys';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  validations = ValidationRules;
  form: FormGroup;
  employee: Employee = { name : '', email: '', phone: '', role: ''};
  employees!:Employee[];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.form = this.fb.group({
      name: new FormControl<string | null>(''),
      email: new FormControl<string | null>(''),
      companyName: new FormControl<string | null>(''),
      contactNo: new FormControl<string | null>(''),
      designation: new FormControl('')
    });
  }

  nameControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }

  getEmployees(): Employee[]{
    this.employeeService.getEmployeeDetails(EmployeeDataStorage.setEmployees).subscribe(data => this.employees = data);
    return this.employees;
  }

  onSubmit() {
    if (this.form.valid) {
      const newEmployee = this.form.value
      this.employee.email = newEmployee!.email;
      this.employee.name = newEmployee!.name;
      this.employee.phone =  newEmployee!.contactNo;
      this.employee.role =  newEmployee!.designation;
      let employees = this.getEmployees();
      employees.push(this.employee);
      this.employeeService.setEmployeeDetails(EmployeeDataStorage.setEmployees, employees);
      alert("Employee Added Succefuly")
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
