import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; //add service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {email:"", password:""} // define model
  constructor(private _auth: AuthService) { } // inject service 

  ngOnInit(): void {
  }

  loginUser(){   // called from http form
    console.log(this.loginUserData) // log data 
    this._auth.loginUser(this.loginUserData)  // method from service 
      .subscribe(                             // subscribe and fetch response from API
        res => console.log(res),
        err => console.log(err)
      )
  }

}
