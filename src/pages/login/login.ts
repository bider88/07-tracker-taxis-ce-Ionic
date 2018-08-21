import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

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
    public loadingCtrl: LoadingController
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
            console.log(data);
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

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

}
