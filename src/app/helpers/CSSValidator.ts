import { FormControl } from '@angular/forms';

export class CSSValidator {
  cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm?.errors && campoForm?.touched };
  }
}
