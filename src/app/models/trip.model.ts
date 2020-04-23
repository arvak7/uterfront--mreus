import { VehicleModel } from './vehicle.model';
import { DriverModel } from './driver.model';

export class TripModel {
    id: number;
    date: Date;
    vehicle: VehicleModel;
    driver: DriverModel;    

    constructor(driver: DriverModel, vehicle: VehicleModel, date: Date, id?: number) {
        this.driver = driver;
        this.vehicle = vehicle;
        this.date = date;
        this.id = id;
     }
}