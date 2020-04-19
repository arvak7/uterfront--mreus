import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
