import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { of } from 'rxjs';
import { Employee } from '../employee-details/employee';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfoCardComponent } from '../info-card/info-card.component';
import { DisplayEmployeesComponent } from '../display-employees/display-employees.component';
import { ModalComponent } from '../reusabel/modal/modal.component';
import { InputComponent } from '../reusabel/input/input.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;

  const mockEmployees: Employee[] = [
    { name: 'John Doe', email: 'john@example.com', phone: '1234567890', role: 'Developer' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', role: 'Manager' }
  ];

  beforeEach(() => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['getEmployeeDetails']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, ModalComponent],
      declarations: [FilterComponent, InfoCardComponent, DisplayEmployeesComponent, InputComponent],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service and load employees on init', () => {
    mockEmployeeService.getEmployeeDetails.and.returnValue(of(mockEmployees));
    fixture.detectChanges();
    expect(component.filteredEmployees.length).toBe(2);
    expect(component.employees.length).toBe(2);
  });

  xit('should apply filters when form is submitted', () => {
    mockEmployeeService.getEmployeeDetails.and.returnValue(of(mockEmployees));
    fixture.detectChanges();
    component.form.controls['name'].setValue('John Doe');
    component.form.controls['email'].setValue('john@example.com');
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.triggerEventHandler('click', null);
    expect(component.filteredEmployees.length).toBe(1);
    expect(component.filteredEmployees[0].name).toBe('John Doe');
  });


  it('should clear filters when clear button is clicked', () => {
    mockEmployeeService.getEmployeeDetails.and.returnValue(of(mockEmployees));
    fixture.detectChanges();

    component.form.controls['name'].setValue('John Doe');
    component.form.controls['email'].setValue('john@example.com');
    component.onSubmit();
    expect(component.filteredEmployees.length).toBe(1);
    const clearButton = fixture.debugElement.query(By.css('button.btn-secondary'));
    clearButton.triggerEventHandler('click', null);
    expect(component.filteredEmployees.length).toBe(2);
  });
});