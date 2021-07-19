import { Attribute, Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appPasswordConfirmValidator]',
  providers: [
    {provide: NG_VALIDATORS,
    useClass: PasswordConfirmValidatorDirective,
    multi: true}
  ],
})
export class PasswordConfirmValidatorDirective implements Validator {
  // @Input() oldPw: any;

  constructor(@Attribute('appPasswordConfirmValidator') public passwordControl: string,
  @Attribute('oldPw') public oldPasswordControl: any) { }
  
  validate(control: AbstractControl): ValidationErrors {
    const newPassword = control.root.get(this.passwordControl);
    const confirmPassword = control;

    const oldPassword = control.root.get(this.oldPasswordControl);    
    

    if (confirmPassword.value === null) {
      return null;
    }

    if (newPassword) {
      const subscription: Subscription = newPassword.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        confirmPassword.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }    
    
    // if (oldPassword) {
    //   const subscription: Subscription = oldPassword.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(() => {
    //     confirmPassword.updateValueAndValidity();
    //     subscription.unsubscribe();
    //   });
    // }    

    if (newPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMatchError: true};
    }
    else if ((newPassword && newPassword.value === oldPassword.value) || 
    (confirmPassword && confirmPassword.value === oldPassword.value)) {
      return { passwordMatchOldError: true};
    }
    else {
      return null;
    }
    // return newPassword && newPassword.value !== confirmPassword.value ? { passwordMatchError: true } : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    return;
  }

  

}
