import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UserProvider {

  key:string;
  user:any = {};

  constructor(
    private _afDB: AngularFirestore
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
            resolve(true);
          } else {
            resolve(false);
          }

          resolve();
        }
      )
    })
  }

}
