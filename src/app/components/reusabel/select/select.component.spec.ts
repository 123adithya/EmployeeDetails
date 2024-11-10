import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { ValidationRules } from '../../employee-details/employee';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.uSelectControl = new FormControl('');
    component.uValidations = ValidationRules.designation;
    component.uLabel = 'Designation';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display label text', () => {
    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.textContent).toContain('Designation:');
  });

  it('should display all designation options', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(component.designation.length);
    options.forEach((option, index) => {
      expect(option.nativeElement.textContent.trim()).toContain(component.designation[index]);
    });
  });

  it('should mark the control as invalid when required validation fails', () => {
    component.uSelectControl.setValue(''); 
    component.uSelectControl.markAsTouched(); 
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(component.uSelectControl.invalid).toBeTrue(); 
    expect(errorMessage.textContent).toContain('Designation is required'); 
  });

  it('should not show validation messages for valid selection', () => {
    component.uSelectControl.setValue(component.designation[0]); 
    fixture.detectChanges();
    const errorMessages = fixture.debugElement.queryAll(By.css('span'));
    expect(component.uSelectControl.invalid).toBeFalse(); 
    expect(errorMessages.length).toBe(0); 
  });
});