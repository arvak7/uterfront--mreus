import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../services/vehicles.service'
import { VehicleModel } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  

  constructor( private vehicleService: VehiclesService) { }

  vehicles: VehicleModel[] = [];

  ngOnInit(): void {
    this.vehicleService.getVehicles()
    .subscribe( (resp: VehicleModel[]) => {
        resp.forEach(car => {
          this.vehicles.push(car);
        });
        console.log(resp);
    });
  }

}
