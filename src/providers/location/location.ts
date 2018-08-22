import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserProvider } from '../user/user';

@Injectable()
export class LocationProvider {

  driver: AngularFirestoreDocument<any>;

  constructor(
    private afDB: AngularFirestore,
    private geolocation: Geolocation,
    private _userProvider: UserProvider
  ) {
    this.driver = this.afDB.doc(`/users/${this._userProvider.key}`);
  }

  initGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.driver.update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        key: this._userProvider.key
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
        this.driver.update({
          lat: data.coords.latitude,
          lng: data.coords.longitude,
          key: this._userProvider.key
        });
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
