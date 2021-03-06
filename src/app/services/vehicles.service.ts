import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleModel } from '../models/vehicle.model';
import { DateFormatPipe } from '../utils/dateformat.component';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  url = 'http://localhost:8079/api/backoffice/v1/vehicles';

  constructor( private http: HttpClient,
               private _dateFormatPipe: DateFormatPipe) { }

  
  createVehicle(vehicle: VehicleModel) {
    return this.http.post(`${this.url}`, vehicle)
    .pipe(
      map( (resp: VehicleModel) => {
        vehicle.id = resp.id;
      })
    );
  }

  updateVehicle(vehicle: VehicleModel) {
    const vehicleTemp = {
      ...vehicle
    }
    delete vehicleTemp.id;
    return this.http.put(`${ this.url }/${vehicle.id}`, vehicleTemp);
  }

  getVehicles() {
    return this.http.get(`${this.url}/`);
  }

  getFreeVehicles(date: Date) {
    let transformedDate = this._dateFormatPipe.transform(date);    
    return this.http.get(`${this.url}/free/${transformedDate}`);
  }

  getVehicle(id: string) {
    return this.http.get((`${ this.url }/${id}`));
  }

  removeVehicle(id: number) {
    return this.http.delete((`${ this.url }/${id}`));
  }
}
