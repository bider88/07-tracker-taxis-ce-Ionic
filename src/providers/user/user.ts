import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

  key:string;
  user:any = {};

  constructor(
    private _afDB: AngularFirestore,
    private platform: Platform,
    private storage: Storage
  ) {

  }

  verifyUser(key: string) {

    key = key.toLowerCase();

    return new Promise( (resolve, reject) => {
      this._afDB.doc(`/users/${key}`).valueChanges().subscribe(
        data => {
          if ( data ) {
            this.key = key;
            this.user = data;
            this.saveStorage();
            resolve(true);
          } else {
            resolve(false);
          }
        }
      )
    })
  }

  saveStorage() {
    if ( this.platform.is('cordova') ) {
      this.storage.set('key', this.key);
    } else {
      localStorage.setItem('key', this.key)
    }
  }

  loadStorage() {
    return new Promise( (resolve, reject) => {
      if ( this.platform.is('cordova') ) {

        this.storage.get('key').then( val => {
          if ( val ) {
            this.key = val;
            resolve(true);
          } else {
            resolve(false);
          }
        });

        this.storage.set('key', this.key);
      } else {
        if ( localStorage.getItem('key') ) {
          this.key = localStorage.getItem('key');
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }

}
