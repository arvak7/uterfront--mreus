import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DriverModel } from '../models/driver.model';
import { VehicleModel } from '../models/vehicle.model';
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
        newTrip.tripId = resp.tripId;
      })
    );
  }

  
}
