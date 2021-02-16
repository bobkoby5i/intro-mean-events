import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = environment.baseUrl;

  
  private _eventsUrl = this.baseUrl + "/api/events";
  private _specialEventsUrl = this.baseUrl  + "/api/special";
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }
  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }  
}

