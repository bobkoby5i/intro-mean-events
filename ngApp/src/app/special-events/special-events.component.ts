import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'; //add
import { HttpErrorResponse } from '@angular/common/http'; //add
import { Router } from '@angular/router'; //add


@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [] // to store results
  constructor(private _eventService: EventService,
              private _router: Router) { }  //inject service 

  ngOnInit(): void {
    this._eventService.getSpecialEvents() // call service
      .subscribe(                  // subscribe to get response
        res => this.specialEvents = res,  // store results in events[]
        err => {
          console.log(err);    // or log error in console
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401){
              this._router.navigate(['/login'])
            }
            if (err.status === 500){
              console.log("unexpected error 500");  
              this._router.navigate(['/login'])
            }            
          }
        }
      )

  }

}


