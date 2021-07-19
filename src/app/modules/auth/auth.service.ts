import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.interface';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignupResponse } from 'src/app/_utils/http-models/signup-response.interface';
import { LoginResponse } from 'src/app/_utils/http-models/login-response.interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { UserRole } from 'src/app/models/user-roles.enum';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private accessToken: string;
  private isAuth = false;
  private tokenTimer: any;
  private auth$ = new BehaviorSubject<boolean>(false);  

  constructor(private http: HttpClient,
    private userService: UserService,
    private router: Router) { }
  
  
  get id() {
    return this.userService.user.userId;
  }

  set token(token: string) {
    this.accessToken = token;
  }

  get token() {
    return this.accessToken;
  }

  get authObs() {
    return this.auth$;
  }

  get auth() {
    return this.isAuth;
  }

  signUp(user: User) {
    return this.http.post<SignupResponse>(environment.HTTP_URLS.SIGN_UP, user).pipe(
      catchError((error) => throwError(error.error))
    )     
  }

  login(userCredentials: {email: string, password: string}) {
    return this.http.post<LoginResponse>(environment.HTTP_URLS.SIGN_IN, userCredentials).pipe(
      catchError((error) => throwError(error.error))
    );    
  }

  resetPassword(oldPassword: string, newPassword: string) {
    return this.http.post(environment.HTTP_URLS.RESET_PW + this.userService.user.userId, 
    {oldPassword: oldPassword, newPassword: newPassword})
    .pipe(
      catchError((error) => throwError(error.error))
    );
  }

  logout() {
    this.isAuth = false;
    this.auth$.next(this.isAuth);
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userService.user = null;
    this.router.navigate(['/']);
  }

  async autoLogin() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    const now = new Date();
    const tokenExpiration = new Date(authInformation.expiration);    
    const expiration = tokenExpiration.getTime() - now.getTime();

    if (expiration > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiration / 1000);
      this.userService.user = authInformation.user;
      this.isAuth = true;
      this.auth$.next(this.isAuth);
    }
  }

  handleLoginSuccess(loginResult: LoginResponse) {
    this.token = loginResult.accessToken;
    this.isAuth = true;
    this.auth$.next(this.isAuth);

    this.setAuthTimer(loginResult.expiresIn);
    const user = loginResult.user;

    this.userService.user = user;
    
    const now = new Date();
    const expiresIn = new Date(now.getTime() + (loginResult.expiresIn * 1000));

    
    this.setAuthData(expiresIn, user);

    if (user.role === UserRole.User) {
      this.router.navigate(['/home']);
    }
    else if (user.role === UserRole.Admin) {
      if (loginResult.passwordChanged) {
        this.router.navigate(['/admin-backend']);
      } else {
        this.router.navigate(['/admin-backend/change-password']);
      }
    }
    
  }  

  private setAuthData(expiresIn: Date, user: User) {    
    localStorage.setItem('token', this.token);
    localStorage.setItem('expiration', expiresIn.toISOString());
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('fullName', user.fullName);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const fullName = localStorage.getItem('fullName');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    const user = {
      userId: userId,
      fullName: fullName,
      email: email,
      role: role
    }

    if (!token || !expiration || !user) {
      return;
    }

    const authInformation = {
      token: token,
      expiration: expiration,
      user: user
    };

    return authInformation;
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
  }

  

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();      
    }, duration * 1000);
  }
}
