import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) {}
  canActivate(): boolean{
    if (this._authService.loggedIn()) {
      return true                           // if logged=token exists then rue
    } else {                                
      this._router.navigate(['/login'])     // else redirect to login     
      return false
    }
  }
}
