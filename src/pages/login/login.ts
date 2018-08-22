import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public _userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    // Indicamos el tipo de paginación
    this.slides.paginationType = 'progress';
    // Bloquemos el slide al usuario
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  showInput() {
    this.alertCtrl.create({
      title: 'Nombre del usuario',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked', data);
          }
        },
        {
          text: 'Ingresar',
          handler: data => {
            this.verifyUser(data.username);
          }
        }
      ]
    }).present();
  }

  login() {

  }

  verifyUser(username: string) {
    const loading = this.loadingCtrl.create({
      content: 'Verificando ' + username + '...'
    });

    loading.present();

    this._userProvider.verifyUser( username )
        .then( success => {

          loading.dismiss();

          if ( success ) {
            this.slides.lockSwipes(false);
            this.slides.freeMode = true;

            this.slides.slideNext();

            this.slides.lockSwipes(true);
            this.slides.freeMode = false;
          } else {
            this.alertCtrl.create({
              title: `Username ${username} incorrecto`,
              subTitle: 'Favor de hablar con el Admin',
              buttons: [
                'Aceptar'
              ]
            }).present();
          }
        });
  }

}
