import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ModalService } from '../../shared/modal.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  responseMsg: string;
  success: boolean;  
  error: any;

  constructor(private authService: AuthService,
    private modalService: ModalService) { 
  
  }

  ngOnInit(): void {
    this.resetForm = new FormGroup({  
      oldPassword : new FormControl(null, [Validators.required]),
      newPassword : new FormControl(null, [Validators.required]),
      confirmPassword : new FormControl(null, [Validators.required])        
    }, {validators: this.checkPasswords()});
    this.modalService.closeModal.subscribe(() => {
      this.isLoading = false;
      this.success = false;
      this.responseMsg = null;
      this.error = null;
      this.resetForm.reset();
    })
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.authService.resetPassword(this.resetForm.controls['oldPassword'].value,
      this.resetForm.controls['newPassword'].value)
      .subscribe((messageOb: any) => {
        this.isLoading = false;
        this.success = true;
        this.responseMsg = messageOb.message === null ? 'You successfully changed your password' : messageOb.message;
      }, (error) => {
        this.error = error;
        this.isLoading = false;
        this.success = false;
        this.responseMsg = error.message === null ? 'It seems that your old password is incorrect' : error.message;
      })
    }
  }


  checkPasswords() {
    const passwordChecker: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {      
      let oldPassword = group.get('oldPassword').value;
      let newPassword = group.get('newPassword').value;
      let confirmPassword = group.get('confirmPassword').value
      if (oldPassword === newPassword) {
        return { passwordMatchOldError: true};
      }
      else if (newPassword !== confirmPassword) {
        return { passwordConfirmError: true };
      }        
      else {
        return null;
      }
      
    } 
    return passwordChecker;
  }
}
