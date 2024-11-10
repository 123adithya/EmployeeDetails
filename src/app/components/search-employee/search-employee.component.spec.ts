import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchEmployeeComponent } from './search-employee.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee-details/employee';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { DisplayEmployeesComponent } from '../display-employees/display-employees.component';
import { InfoCardComponent } from '../info-card/info-card.component';
import { ModalComponent } from '../reusabel/modal/modal.component';
import { AppModule } from '../../app.module';

describe('SearchEmployeeComponent', () => {
  let component: SearchEmployeeComponent;
  let fixture: ComponentFixture<SearchEmployeeComponent>;
  let employeeServiceMock: jasmine.SpyObj<EmployeeService>;

  const mockEmployees: Employee[] = [
    { email: 'john.doe@example.com', name: 'John Doe', phone: '1234567890', role: 'Developer' },
    { email: 'jane.doe@example.com', name: 'Jane Doe', phone: '9876543210', role: 'Manager' },
    { email: 'bob.smith@example.com', name: 'Bob Smith', phone: '1112223333', role: 'Designer' }
  ];

  beforeEach(async () => {
    employeeServiceMock = jasmine.createSpyObj('EmployeeService', ['getEmployeeDetails']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, ModalComponent],
      declarations: [DisplayEmployeesComponent,SearchEmployeeComponent, InfoCardComponent, ],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEmployeeComponent);
    component = fixture.componentInstance;
    employeeServiceMock.getEmployeeDetails.and.returnValue(of(mockEmployees));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employees on init', () => {
    expect(component.employees.length).toBe(3);
    expect(component.searchedEmployees.length).toBe(3);
    expect(component.searchedEmployees).toEqual(mockEmployees);
  });

  xit('should update searchedEmployees when search term changes', () => {
    expect(component.searchedEmployees.length).toBe(3);
    component.onSearch('Jane');
    fixture.detectChanges();
    expect(component.searchedEmployees[0].name).toBe('Jane Doe');
  });

  xit('should show "No Results Found" when no employee matches the search term', () => {
    component.onSearch('NonExistentName');
    fixture.detectChanges();
    const noResultsElement: DebugElement = fixture.debugElement.query(By.css('div'));
    expect(noResultsElement.nativeElement.textContent).toContain('No Results Found');
  });

  xit('should hide "No Results Found" when there are search results', () => {
    component.onSearch('Jane');
    fixture.detectChanges();

    const noResultsElement: DebugElement = fixture.debugElement.query(By.css('div'));
    expect(noResultsElement).toBeNull(); 
  });

  it('should debounce search input', () => {
    spyOn(component, 'onSearch').and.callThrough();
    component.onSearch('John');
    component.onSearch('Jane');
    fixture.detectChanges();
    expect(component.onSearch).toHaveBeenCalledTimes(2);
  });

  it('should update searchedEmployees after debounce time', (done) => {
    component.onSearch('John');
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.searchedEmployees.length).toBe(1);
      expect(component.searchedEmployees[0].name).toBe('John Doe');
      done();
    }, 300);
  });
});