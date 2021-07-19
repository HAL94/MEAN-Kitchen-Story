import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRole } from 'src/app/models/user-roles.enum';
import { LoginResponse } from 'src/app/_utils/http-models/login-response.interface';
import { ModalService } from '../../shared/modal.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  responseMsg: string;
  success: boolean;  
  error: any;

  constructor(private authService: AuthService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.closeModal.subscribe(() => {
      this.isLoading = false;
    this.success = false;
    this.responseMsg = null;
    this.error = null;
    })
  }

  onSubmit(loginForm: NgForm) {
    const userCredentials = {
      email: loginForm.value.email,
      password: loginForm.value.password
    };

    if (loginForm.valid) {
      this.isLoading = true;
      this.authService.login(userCredentials).subscribe((result: LoginResponse) => {
        
        this.isLoading = false;
        this.success = true;
        this.responseMsg = result.message === null ? 'You successfully logged in' : result.message;
        
        if (result.user.role === UserRole.User) {
          this.responseMsg += '...Redirecting you to store';
        } else if (result.user.role === UserRole.Admin) {
          this.responseMsg += '...Redirecting you to adminstration';
        }
        
        setTimeout(() => {
          this.authService.handleLoginSuccess(result); 
        }, 1000);
        
      }, (error) => {
        this.error = error;
        this.isLoading = false;
        this.success = false;
        this.responseMsg = error.message === null ? 'It seems that your credentials are incorrect' : error.message;
      })
    }
  }





}
