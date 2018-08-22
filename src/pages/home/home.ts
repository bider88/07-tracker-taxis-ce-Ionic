import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    public navCtrl: NavController,
    public _locationProvider: LocationProvider
  ) {
    this._locationProvider.initGeolocation();
  }

}
