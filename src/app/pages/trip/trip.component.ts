import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverModel } from 'src/app/models/driver.model';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { TripModel } from 'src/app/models/trip.model';
import { DriversService } from 'src/app/services/drivers.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { TripsService } from 'src/app/services/trips.service';


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

  constructor(private driversService: DriversService,
    private vehiclesService: VehiclesService,
    private tripsService: TripsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.createListeners();
  }


  createForm() {
    this.forma = this.fb.group({
      vehicle: ['', [Validators.required]],
      driver: ['', [Validators.required]],
      picker: ['', [Validators.required]]
    });
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
      var newTrip: TripModel = new TripModel(this.forma.controls.driver.value[0], this.forma.controls.vehicle.value[0], this.tripDate);
      this.tripsService.createTrip(newTrip).subscribe(resp => {

      });
    }
  }

}
