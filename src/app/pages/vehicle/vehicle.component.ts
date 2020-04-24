import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
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
  vehicleName: string = "";

  constructor(private vehiclesService: VehiclesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');    
    if (id !== 'new') {
      this.vehiclesService.getVehicle(id)
        .subscribe( (resp: VehicleModel) => {
            this.vehicle = resp;
            this.refreshName(resp);
        });
    }
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

    if (this.vehicle.id) {
      peticion = this.vehiclesService.updateVehicle(this.vehicle);
    } else {
      peticion = this.vehiclesService.createVehicle(this.vehicle);
    }
    peticion.subscribe(resp => {      
      Swal.fire({
        title: this.vehicle.brand + ' ' + this.vehicle.model + ' ' + this.vehicle.plate,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    })
  }

  refreshName(vehicle: VehicleModel) {
    var brand = this.vehicle.brand == undefined ? '' : this.vehicle.brand;
    var model = this.vehicle.model == undefined ? '' : this.vehicle.model;
    var plate = this.vehicle.plate == undefined ? '' : this.vehicle.plate;
    this.vehicleName = brand + ' ' + model + ' ' + plate;
  }
}
