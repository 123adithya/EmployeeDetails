import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee-details/employee';
import { EmployeeDataStorage } from '../../services/LocalStorageKeys';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrl: './search-employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchEmployeeComponent {
  employees!: Employee[];
  searchedEmployees!: Employee[];
  searchSubject = new BehaviorSubject<string>('');

  constructor( private uEmployeeService: EmployeeService) {}

  ngOnInit(): void {
    this.uEmployeeService.getEmployeeDetails(EmployeeDataStorage.setEmployees).subscribe((data) => { this.searchedEmployees = this.employees = [...data]});
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((searchTerm: string) => this.filterEmployees(searchTerm))
      )
      .subscribe(results => {
        this.searchedEmployees = results;
      });
  }

  onSearch(value: string | null) {
    this.searchSubject.next(value!);
  }

  filterEmployees(searchTerm: string): Employee[] {
    const lowerCaseTerm = searchTerm.toLowerCase();

    return this.employees.filter(employee => {
      return Object.values(employee).some(value =>
        String(value).toLowerCase().includes(lowerCaseTerm)
      );
    });
  }
}
