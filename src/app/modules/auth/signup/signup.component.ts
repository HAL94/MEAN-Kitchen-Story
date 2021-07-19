import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { SignupResponse } from 'src/app/_utils/http-models/signup-response.interface';
import { ModalService } from '../../shared/modal.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  responseMsg: string;
  success: boolean;  
  error: any;

  constructor(private authService: AuthService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.closeModal.subscribe(() => {
      this.responseMsg = null;
      this.error = null;
      this.isLoading = false;
      this.success = false;
    })
  }

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      const user: User = {
        fullName: signupForm.value.fullName,
        email: signupForm.value.email,
        password: signupForm.value.password
      }
      this.isLoading = true;      
      this.authService.signUp(user).subscribe((result: SignupResponse) => {        
        this.isLoading = false;
        this.success = true;
        this.responseMsg = result.message;
        signupForm.reset();
      }, (error: any) => {      
        this.error = error;
        this.isLoading = false;
        this.success = false;
        this.responseMsg = error.message;
      });
    }
  }

  onCloseErrorMessage() {
    this.responseMsg = null;
    this.error = null;
    this.isLoading = false;
    this.success = false;
  }
}
