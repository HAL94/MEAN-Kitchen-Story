import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from '../modules/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.authObs.pipe(
      take(1),
      switchMap((auth: boolean) => {
        if (!auth) {
          return next.handle(req);
        }

        const cloneReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this.authService.token)});        
        return next.handle(cloneReq);
      })
    )
  }


}
