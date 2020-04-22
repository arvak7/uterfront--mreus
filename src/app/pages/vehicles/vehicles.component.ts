import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../services/vehicles.service'
import { VehicleModel } from '../../models/vehicle.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  

  constructor( private vehicleService: VehiclesService) { }

  vehicles: VehicleModel[] = [];
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.vehicleService.getVehicles()
    .subscribe( (resp: VehicleModel[]) => {
        this.vehicles = resp;
        this.loading = false;
    });
  }

  removeVehicle( vehicle: VehicleModel, i: number) {     
    Swal.fire({
      title: '¿ Esta seguro?',
      text: `Esta seguro de que desa borrar a ${ vehicle.brand } ${ vehicle.model } ${ vehicle.plate }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.vehicleService.removeVehicle( vehicle.id ).subscribe();
        this.vehicles.splice(i,1);
      }
    });    
  }
}
