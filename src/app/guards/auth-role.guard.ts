import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router) {}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.userObs.pipe(
        take(1),
        map((user: User) => {
          if (this.authService.token) {
            if (user && route.data.roles && route.data.roles.indexOf(user.role) !== -1) {
              return true;
            }
          }
          this.router.navigate(['/auth/login']);
          return false;
        })
      );
  }
  
}
