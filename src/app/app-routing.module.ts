import { NgModule, Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';

const routes: Routes = [
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicle/:id', component: VehicleComponent },
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
