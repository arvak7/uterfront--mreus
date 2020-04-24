import { VehicleModel } from './vehicle.model';
import { DriverModel } from './driver.model';

export class TripModel {
    id: number;
    date: Date;
    vehicles: VehicleModel[];
    drivers: DriverModel[];    

    constructor(drivers: DriverModel[], vehicles: VehicleModel[], date: Date, id?: number) {
        this.drivers = drivers;
        this.vehicles = vehicles;
        this.date = date;
        this.id = id;
     }
}