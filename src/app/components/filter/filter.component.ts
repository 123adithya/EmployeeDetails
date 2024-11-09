import { Component, OnInit } from '@angular/core';
import { Employee, ValidationRules } from '../employee-details/employee';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDataStorage } from '../../services/LocalStorageKeys';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{
  validations = ValidationRules;
  form!: FormGroup;
  isDisabled: boolean = true;
  filteredEmployees!: Employee[];
  employees!: Employee[];

  constructor(private fb: FormBuilder, private uEmployeeService: EmployeeService) {
    this.form = this.fb.group({
      name: new FormControl<string | null>(''),
      email: new FormControl<string | null>('')
    });
  }

  ngOnInit(): void {
    this.filteredEmployees = this.employees =this.uEmployeeService.getItem(EmployeeDataStorage.setEmployees);
  }

  nameControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }

  clearFilter(){
    this.isDisabled = true;
    this.filteredEmployees = this.employees;
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      this.isDisabled = false;
      this.applyFilters(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
    }
  }

  applyFilters(filters: Employee) {
    this.filteredEmployees = this.employees.filter((employee: any) => {
      return Object.entries(filters).every(([key, value]) => {
        return employee[key]?.toLowerCase() === value?.toLowerCase();
      });
    });
  };
}