import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, delay, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from '../../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, 
    private toast: NgToastService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    
    if(token){
      request = request.clone({
        setHeaders: {Authorization: `bearer ${token}`}
      })
    }
    
    return next.handle(request).pipe(
      catchError((error:any) => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this.handleUnAuthError(request, next)
            return throwError(() => new Error("Login session expired"));
          }
          if (error.status == 400)
          {
            return throwError(() => new Error("Incorrect login credentials"));
          }
        }
        this.router.navigate(['/login']);
        return throwError(() => new Error("Login session expired"));
    }));
  }
  handleUnAuthError(req:HttpRequest<any>, next: HttpHandler){

    let tokenapimodel = new TokenApiModel();
    tokenapimodel.accessToken = this.auth.getToken()!;
    tokenapimodel.refreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenapimodel).pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization: `bearer ${data.accessToken}`}
        })
        return next.handle(req);
      }),
      catchError(()=> {
        return throwError(() => {
          this.toast.warning({detail: 'Warning', summary: 'Login session expired, please log in again', duration: 5000});
          this.router.navigate(['/login']);
        })
      })
  )}
}
