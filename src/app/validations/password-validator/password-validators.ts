import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {

  static passwordPattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

  static get password() {
    return this.passwordRequirementValidator(this.passwordPattern, 'password')
  }

  static get minChars() {
    const pattern = new RegExp(/.{8,}/);
    return this.passwordRequirementValidator(pattern, 'password-minchars')
  }

  static get minUppers() {
    const pattern = new RegExp(/(?=.*[A-Z]){1,}/);
    return this.passwordRequirementValidator(pattern, 'password-minuppers');
  }

  static get minLowers() {
    const pattern = new RegExp(/(?=.*[a-z]){1,}/);
    return this.passwordRequirementValidator(pattern, 'password-minlowers');
  }

  static get minDigits() {
    const pattern = new RegExp(/(?=.*\d){1,}/)
    return this.passwordRequirementValidator(pattern, 'password-mindigits');
  }  

  public static matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const matchToControl = control.root.get(matchTo);
      
      if (!matchToControl) {
        return null;
      }

      return control.value === matchToControl.value
          ? null
          : { 'password-match': true };
    };
}

  private static passwordRequirementValidator(nameRe: RegExp, key: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = nameRe.test(control.value);
      
      return valid
        ? null
        : { [key] : {value: control.value} };
    };
}
}