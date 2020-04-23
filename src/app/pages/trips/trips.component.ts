import { Component, OnInit } from '@angular/core';
import {TripsService} from '../../services/trips.service'
import { TripModel } from '../../models/trip.model';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {  

  constructor( private tripsService: TripsService) { }

  trips: TripModel[] = [];
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.tripsService.getTrips()
    .subscribe( (resp: TripModel[]) => {
        this.trips = resp;
        this.loading = false;
    });
  }

  removeTrip( trip: TripModel, i: number) {   
    console.log("trip: "+ trip.vehicle)  
    Swal.fire({
      title: '¿ Esta seguro?',
      text: `Esta seguro de que desa borrar a ${ trip.vehicle.brand } ${ trip.vehicle.model } ${ trip.driver.name } ${ trip.driver.surname } ${ trip.date }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.tripsService.removeTrip( trip.tripId ).subscribe();
        this.trips.splice(i,1);
      }
    });    
  }
}
