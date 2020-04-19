import { NgModule, Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';

import { DriversComponent } from './pages/drivers/drivers.component';
import { DriverComponent } from './pages/driver/driver.component';

const routes: Routes = [
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicle/:id', component: VehicleComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'driver/:id', component: DriverComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'vehicles'}
]

@NgModule({  
  imports: [ 
    RouterModule.forRoot(routes)
   ],
   exports: [
     RouterModule
   ]
})
export class AppRoutingModule { }
