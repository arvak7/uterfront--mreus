import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DriverModel } from 'src/app/models/driver.model';
import { ActivatedRoute } from '@angular/router'
import { DriversService } from 'src/app/services/drivers.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  forma: FormGroup;

  driversList: DriverModel[];
  vehicleList: string[] =['Peugeot 3008', 'Seat Ibiza', 'Seat Panda', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private DriversService: DriversService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');    
    if (id !== 'new') {
      this.DriversService.getFreeDrivers()
        .subscribe( (resp: DriverModel[]) => {
            this.driversList = resp;            
        });
    }
  }

  createForm() {
    this.forma = this.fb.group({
      vehicle: [''],
      driver: [''],
      picker: ['']
    });
  }

  guardar() {
    console.log("aqui entra");
    console.log(this.forma);
  }

}
