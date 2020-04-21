import { VehicleModel } from './vehicle.model';
import { DriverModel } from './driver.model';

export class TripModel {
    tripId: number;
    date: Date;
    vehicle: VehicleModel;
    driver: DriverModel;    

    constructor(driver: DriverModel, vehicle: VehicleModel, date: Date) {
        this.driver = driver;
        this.vehicle = vehicle;
        this.date = date;
     }
}