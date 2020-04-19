import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleModel } from '../models/vehicle.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  url = 'http://localhost:8079/api/backoffice/v1/vehicles';

  constructor(private http: HttpClient) { }

  
  createVehicle(vehicle: VehicleModel) {
    return this.http.post(`${this.url}`, vehicle)
    .pipe(
      map( (resp: VehicleModel) => {
        vehicle.vehicleId = resp.vehicleId;
      })
    );
  }

  updateVehicle(vehicle: VehicleModel) {
    const vehicleTemp = {
      ...vehicle
    }
    delete vehicleTemp.vehicleId;
    return this.http.put(`${ this.url }/${vehicle.vehicleId}`, vehicleTemp);
  }

  getVehicles() {
    return this.http.get(`${this.url}/`);
  }
}
