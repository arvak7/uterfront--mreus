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

  driversList: DriverModel[];
  vehicleList: VehicleModel[];
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
        .subscribe( (resp: TripModel) => {
          this.forma.controls.picker.setValue(resp.date);  
          console.log("vehid: " + resp.vehicle.id);
          this.forma.controls.vehicle.setValue([resp.vehicle.vehicleId]);    
          this.forma.controls.driver.setValue([resp.driver.id]);
          this.forma.controls.id.setValue(id);
          this.id = parseInt(id);                    
        });
    }
  }

  createForm() {
    this.forma = this.fb.group({
      id:       ['', [Validators.required]],
      vehicle:  ['', [Validators.required]],
      driver:   ['', [Validators.required]],
      picker:   ['', [Validators.required]]
    });
  }

  test() {
    this.forma.controls.vehicle.setValue([28]);
  }

  createListeners() {
    this.forma.get("picker").valueChanges.subscribe(event => {
      this.tripDate = event;
      this.driversService.getFreeDrivers().subscribe((resp: DriverModel[]) => {
        this.driversList = resp;
      });
      this.vehiclesService.getFreeVehicles().subscribe((resp: VehicleModel[]) => {
        this.vehicleList = resp;
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
   

    if (this.forma.valid) {
      let vehicle: VehicleModel;
      let driver:  DriverModel;

      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        allowOutsideClick: false,
        icon: 'info'
      });
      Swal.showLoading();

      this.vehicleList.forEach( (a: VehicleModel) => {
        for (let index = 0; index < this.forma.controls.vehicle.value.length; index++) {
          let element: number = this.forma.controls.vehicle.value[index];
          if (a.vehicleId == element) {
            vehicle = a;
          }          
        }
      });
      this.driversList.forEach( (a: DriverModel) => {
        for (let index = 0; index < this.forma.controls.driver.value.length; index++) {
          let element: number = this.forma.controls.driver.value[index];
          if (a.id == element) {
            driver = a;
          }          
        }
      });
      
      let peticion: Observable<any>;
      
      if (this.id) {
        var updateTrip: TripModel = new TripModel(driver, vehicle, this.tripDate, this.id);     
        peticion = this.tripsService.updateTrip(updateTrip);
      } else {
        var newTrip: TripModel = new TripModel(driver, vehicle, this.tripDate);
        peticion = this.tripsService.createTrip(newTrip);
      }

      peticion.subscribe(resp => {
        console.log("resp: " + resp)
        Swal.fire({
          title: vehicle.brand + ' ' + vehicle.model + ' ' + driver.name + ' ' + driver.surname + ' ' + this.tripDate,
          text: 'Se actualizó correctamente',
          icon: 'success'
        });
      })
      
    }
  }

}
