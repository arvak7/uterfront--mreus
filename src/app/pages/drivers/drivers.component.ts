import { Component, OnInit } from '@angular/core';
import { DriverModel } from 'src/app/models/driver.model';
import { DriversService } from 'src/app/services/drivers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {  

  constructor( private driversService: DriversService) { }

  drivers: DriverModel[] = [];
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.driversService.getDrivers()
      .subscribe( (resp: DriverModel[]) => {             
        this.drivers = resp;
        this.loading = false;
    });
  }

  removeDriver( driver: DriverModel, i: number) {     
    Swal.fire({
      title: '¿ Esta seguro?',
      text: `Esta seguro de que desa borrar a ${ driver.name } ${ driver.surname }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( (resp: any) => {
      if ( resp.value ) {        
        this.driversService.removeDriver( driver.id ).subscribe();
        this.drivers.splice(i,1);
      }
    });    
  }
}
