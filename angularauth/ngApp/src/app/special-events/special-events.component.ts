import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'; //add

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [] // to store results
  constructor(private _eventService: EventService) { }  //inject service 

  ngOnInit(): void {
    this._eventService.getSpecialEvents() // call service
      .subscribe(                  // subscribe to get response
        res => this.specialEvents = res,  // store results in events[]
        err => console.log(err)    // or log error in console
      )

  }

}


