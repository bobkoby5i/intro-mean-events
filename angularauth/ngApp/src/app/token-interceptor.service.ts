import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    //constructor(private _authService: AuthService) has some issues with is why we use below method
  constructor(private injector: Injector) { }
  intercept(req, next){
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}` // append actual token from local storage

      }
    })
    return next.handle(tokenizedReq)
  }
}
