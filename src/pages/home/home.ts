import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number;
  lng: number;

  user: any = {};

  constructor(
    public navCtrl: NavController,
    public _locationProvider: LocationProvider
  ) {
    this._locationProvider.initGeolocation();

    this._locationProvider.driver.valueChanges().subscribe(
      data => {
        console.log(data);
        this.user = data;
      }
    );
  }

}
