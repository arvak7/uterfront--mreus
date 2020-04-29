import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DriverModel } from '../models/driver.model';
import { DateFormatPipe } from '../utils/dateformat.component';


@Injectable({
  providedIn: 'root'
})
export class DriversService {

  url = 'http://localhost:8079/api/backoffice/v1/drivers';

  constructor( private http: HttpClient,
               private _dateFormatPipe: DateFormatPipe) { }

  
  createDriver(driver: DriverModel) {
    return this.http.post(`${this.url}`, driver)
    .pipe(
      map( (resp: DriverModel) => {
        driver.id = resp.id;
      })
    );
  }

  updateDriver(driver: DriverModel) {
    const driverTemp: DriverModel = {
      ...driver
    }
    delete driverTemp.id;    
    return this.http.put(`${ this.url }/${driver.id}`, driverTemp);
  }

  getDrivers() {
    return this.http.get(`${this.url}`);
  }

  getFreeDrivers(date: Date, license: string) {
    let transformedDate = this._dateFormatPipe.transform(date);
    return this.http.get(`${this.url}/free?fecha=${transformedDate}&license=${license}`);
  }

  getDriver(id: string) {
    return this.http.get((`${ this.url }/${id}`));
  }

  removeDriver(id: number) {    
    return this.http.delete((`${ this.url }/${id}`));
  }
}
