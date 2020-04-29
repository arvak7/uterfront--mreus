import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverModel } from 'src/app/models/driver.model';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { TripModel } from 'src/app/models/trip.model';
import { DriversService } from 'src/app/services/drivers.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { TripsService } from 'src/app/services/trips.service';
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  forma: FormGroup;

  driversList: DriverModel[]  = [];
  vehicleList: VehicleModel[] = [];
  tripDate: Date;
  id: number;


  constructor(private driversService: DriversService,
    private vehiclesService: VehiclesService,
    private tripsService: TripsService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.createListeners();

    this.forma.controls.id.disable();

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.tripsService.getTrip(id)
        .subscribe((resp: TripModel) => {
          let vehiclesId: number[] = [];
          let driversId: number[] = [];
          resp.vehicles.forEach(vehicle => {
            vehiclesId.push(vehicle.id);
          });
          resp.drivers.forEach(driver => {
            driversId.push(driver.id);
          });
          this.forma.controls.picker.setValue(resp.date);
          this.forma.controls.vehicle.setValue(vehiclesId);
          this.forma.controls.driver.setValue(driversId);
          this.forma.controls.id.setValue(id);
          this.id = parseInt(id);
        });
    }
  }

  createForm() {
    this.forma = this.fb.group({
      id: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      driver: ['', [Validators.required]],
      picker: ['', [Validators.required]]
    });
  }
 

  createListeners() {
    this.forma.get("picker").valueChanges.subscribe(event => {
      console.log(this);
      this.tripDate = event;
      this.driversService.getDrivers().subscribe((resp: DriverModel[]) => {
        this.driversList = resp;
      });
      this.vehiclesService.getVehicles().subscribe((resp: VehicleModel[]) => {
        this.vehicleList = resp;
      });

      this.forma.get("vehicle").valueChanges.subscribe(event => {
        console.log(this);
        if (this.vehicleList.length > 0) {
          let newLicense: string = '';
          this.vehicleList.forEach((a: VehicleModel) => {
            if (this.forma.controls.vehicle.value.length > 0) {
              let element: number = this.forma.controls.vehicle.value[0];
              if (a.id == element) {
                newLicense += a.licenseRequired;
              }
            }
          });          
          this.driversService.getFreeDrivers(this.tripDate, newLicense).subscribe((resp: DriverModel[]) => {            
            this.driversList = resp;            
          });
        }
        
      });
    });
  }

  //
  // Validations
  //
  get vehicleInvalid() {
    return this.forma.get('vehicle').invalid && (this.forma.get('vehicle').touched || this.forma.get('vehicle').dirty)
  }

  get dateInvalid() {
    return this.forma.get('picker').invalid && (this.forma.get('picker').touched || this.forma.get('picker').dirty)
  }

  get driverInvalid() {
    return this.forma.get('driver').invalid && (this.forma.get('driver').touched || this.forma.get('driver').dirty)
  }


  save() {
    this.forma.controls.vehicle.updateValueAndValidity;
    this.forma.controls.driver.updateValueAndValidity;

    if (this.forma.valid) {
      let vehicles: VehicleModel[] = [];
      let drivers: DriverModel[] = [];

      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        allowOutsideClick: false,
        icon: 'info'
      });
      Swal.showLoading();

      this.vehicleList.forEach((a: VehicleModel) => {
        for (let index = 0; index < this.forma.controls.vehicle.value.length; index++) {
          let element: number = this.forma.controls.vehicle.value[index];
          if (a.id == element) {
            vehicles.push(a);
          }
        }
      });
      this.driversList.forEach((a: DriverModel) => {
        for (let index = 0; index < this.forma.controls.driver.value.length; index++) {
          let element: number = this.forma.controls.driver.value[index];
          if (a.id == element) {
            drivers.push(a);
          }
        }
      });

      let peticion: Observable<any>;

      if (this.id) {
        var updateTrip: TripModel = new TripModel(drivers, vehicles, this.tripDate, this.id);
        peticion = this.tripsService.updateTrip(updateTrip);
      } else {
        var newTrip: TripModel = new TripModel(drivers, vehicles, this.tripDate);
        peticion = this.tripsService.createTrip(newTrip);
      }

      peticion.subscribe(resp => {
        Swal.fire({
          title: vehicles[0].brand + ' ' + vehicles[0].model + ' ' + drivers[0].name + ' ' + drivers[0].surname + ' ' + this.tripDate,
          text: 'Se actualizó correctamente',
          icon: 'success'
        });
      })

    }
  }

}
