import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {};

  constructor(
    public navCtrl: NavController,
    public _locationProvider: LocationProvider,
    private _userProvider: UserProvider
  ) {
    this._locationProvider.initGeolocation();
    this._locationProvider.initDriver();
    this._locationProvider.driver.valueChanges().subscribe(
      data => {
        this.user = data;
      }
    );
  }

  logout() {
    this._locationProvider.stopLocation();
    this._userProvider.deleteUser();
    this.navCtrl.setRoot( LoginPage );
  }

}
