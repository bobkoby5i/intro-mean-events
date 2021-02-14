import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'; //add

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [] // to store results
  constructor(private _eventService: EventService) { }  //inject service 


  ngOnInit(): void {
    this._eventService.getEvents() // call service
      .subscribe(                  // subscribe to get response
        res => this.events = res,  // store results in events[]
        err => console.log(err)    // or log error in console
      )
  }

}
