import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TripModel } from '../models/trip.model';


@Injectable({
  providedIn: 'root'
})
export class TripsService {

  url = 'http://localhost:8079/api/frontend/v1/trips';

  constructor(private http: HttpClient) { }

  
  createTrip(newTrip: TripModel) {    
    return this.http.post(`${this.url}`, newTrip)
    .pipe(
      map( (resp: TripModel) => {
        newTrip.id = resp.id;
      })
    );
  }

  updateTrip(trip: TripModel) {
    const tripTemp = {
      ...trip
    }
    delete tripTemp.id;
    return this.http.put(`${ this.url }/${trip.id}`, tripTemp);
  }

  getTrips() {
    return this.http.get(`${this.url}`);
  }

  getTrip(id: string) {
    return this.http.get((`${ this.url }/${id}`));
  }

  removeTrip(id: number) {    
    return this.http.delete((`${ this.url }/${id}`));
  }
  
}
