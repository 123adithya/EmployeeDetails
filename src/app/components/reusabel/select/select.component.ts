import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Validation, designation } from '../../employee-details/employee';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit{
  @Input() uSelectControl!: FormControl<string | null>;
  @Input() uValidations!: Validation[];
  @Input() uLabel!: string;
  designation: string[] = designation;
  ngOnInit(): void {
    this.uSelectControl!.setValidators(this.getValidators(this.uValidations));
  }

  getValidators(validations: any[]): ValidatorFn[] {
    return validations?.map(validation => {
      switch (validation.type) {
        case 'required':
          return Validators.required;
        case 'regex':
          return Validators.pattern(validation.value || '');
        default:
          return Validators.nullValidator;
      }
    }).filter(Boolean) as ValidatorFn[];
  }
}