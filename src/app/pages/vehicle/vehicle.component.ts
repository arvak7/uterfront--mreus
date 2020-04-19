import { Component, OnInit } from '@angular/core';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { NgForm } from '@angular/forms';
import { VehiclesService } from 'src/app/services/vehicles.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehicle: VehicleModel = new VehicleModel();

  constructor(private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario invalido')
      return
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false,
      icon: 'info'      
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.vehicle.vehicleId) {
      peticion = this.vehiclesService.updateVehicle(this.vehicle);      
    } else {
      peticion = this.vehiclesService.createVehicle(this.vehicle);      
    }    
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.vehicle.model,
        text: 'succes',
        icon: 'info'
      });
    })
  }
}
