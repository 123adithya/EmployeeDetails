import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Validation } from '../../employee-details/employee';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit{
  @Input() uInputControl!: FormControl<string | null>;
  @Input() uValidations!: Validation[];
  @Input() uType!: string;
  @Input() uLabel!: string;

  @Output() uEmitInputText: EventEmitter<string | null> = new EventEmitter<string | null>();

  ngOnInit(): void {
    this.uInputControl!.setValidators(this.getValidators(this.uValidations));
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

  onSearch(value: string | null) {
    this.uEmitInputText.next(value);
  }
}
