import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()

export class AuthService {

  baseUrl = environment.baseUrl;
 
  
  
  private _registerUrl = this.baseUrl + "/api/register";
  private _loginUrl    = this.baseUrl + "/api/login";


  constructor(private http: HttpClient,
              private _router: Router) { }
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user_json){
    return this.http.post<any>(this._loginUrl, user_json)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
    
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/events'])

  }
    
}
