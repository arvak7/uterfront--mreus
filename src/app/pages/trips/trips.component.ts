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
    Swal.fire({
      title: '¿ Esta seguro?',
      text: `Esta seguro de que desa borrar a ${ trip.vehicles[0].brand } ${ trip.vehicles[0].model } ${ trip.drivers[0].name } ${ trip.drivers[0].surname } ${ trip.date }`,
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
