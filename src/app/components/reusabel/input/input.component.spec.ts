import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { Component, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validation, ValidationRules } from '../../employee-details/employee';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('InputComponentTest', () => {
  let component: InputComponentTest;
  let fixture: ComponentFixture<InputComponentTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[InputComponentTest, InputComponent],
      imports: [CommonModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponentTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('defaults', ()=>{
    const subject = TestBed.createComponent(InputComponent).componentInstance;
    console.log(subject)
    expect(component.uLabel).toEqual(subject.uLabel);
    expect(component.uType).toEqual(subject.uType);
    expect(component.uValidations).toEqual(subject.uValidations);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label with the correct text', () => {
    component.uLabel = "Name";
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.textContent).toContain('Employee Name');
  });

  it('should bind the input ID to the uLabel', () => {
    component.uLabel ="Name";
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.id).toBe('Name');
  });

  

  it('should emit input value on input event', () => {
    spyOn(component.uEmitInputText, 'next');

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Test Value';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.uEmitInputText.next).toHaveBeenCalledWith('Test Value');
  });

 

  xdescribe('validation', ()=> {

    beforeEach(() => {
      component.uValidations = ValidationRules.name;
      fixture.detectChanges();
    })
   

    it('should show validation messages when invalid', () => {
      component.uInputControl.markAsTouched();
      fixture.detectChanges();
  
      const validationMessage = fixture.debugElement.query(By.css('span')).nativeElement;
      expect(validationMessage.textContent).toContain('Only letters are allowed');
    });

    it('should mark the control as invalid when required validation fails', fakeAsync(() => {
      tick(100);
      component.uInputControl.setValue('');
      component.uInputControl.markAsTouched();
      fixture.detectChanges();
  
      expect(component.uInputControl.invalid).toBeTrue();
      const errorMessage = fixture.debugElement.query(By.css('span')).nativeElement;
      expect(errorMessage.textContent).toContain('This field is required');
    }));
  })

});

@Component({
  selector: 'app-input-test',
  template: `<app-input 
           [uInputControl]="uInputControl" 
          [uType]="uType" 
          [uLabel]="uLabel" 
          [uValidations]="uValidations" 
          (uEmitInputText)= "uEmitInputText.next($event)">
        </app-input>`
})
class InputComponentTest{
  uInputControl: FormControl =new FormControl<string | null>('', { nonNullable: true })
  uType!: string;
  uLabel!: string;
  uValidations!: Validation[];
  uEmitInputText: EventEmitter<string> = new EventEmitter<string>();
}