import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DriverModel } from 'src/app/models/driver.model';
import { NgForm } from '@angular/forms';
import { DriversService } from 'src/app/services/drivers.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driver: DriverModel = new DriverModel();
  driverName: string = "";

  constructor(private DriversService: DriversService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');    
    if (id !== 'new') {
      this.DriversService.getDriver(id)
        .subscribe( (resp: DriverModel) => {
            this.driver = resp;
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
    
    if (this.driver.id) {
      peticion = this.DriversService.updateDriver(this.driver);
    } else {
      peticion = this.DriversService.createDriver(this.driver);
    }
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.driver.name + ' ' + this.driver.surname,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    })
  }

  refreshName(vehicle: DriverModel) {
    var name = this.driver.name == undefined ? '' : this.driver.name;
    var surname = this.driver.surname == undefined ? '' : this.driver.surname;
    var license = this.driver.license == undefined ? '' : this.driver.license;
    this.driverName = name + ' ' + surname + ' ' + '('+ license + ')';
  }
}
