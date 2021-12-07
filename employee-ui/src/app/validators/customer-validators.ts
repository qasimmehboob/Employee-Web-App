import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export class CustomValidators {

    // whitespace validation

    static notOnlyWhitespace(control: FormControl): ValidationErrors {
        if((control.value != null) && (control.value.trim().length === 0) ) {
            return {'notOnlyWhitespace': true}
        }
        else {
            return null as any;
        }
    }

    static isNumberCheck(): ValidatorFn {
        return  (c: AbstractControl): {[key: string]: boolean} | null => {
          let number = /^[.\d]+$/.test(c.value) ? +c.value : NaN;
          if (number !== number) {
            return { 'value': true };
          }
    
          return null;
        };
    }
}