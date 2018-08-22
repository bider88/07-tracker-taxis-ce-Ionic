import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UserProvider } from '../providers/user/user';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    _userProvider: UserProvider
  ) {
    platform.ready().then(() => {
      _userProvider.loadStorage()
          .then( exist => {

            statusBar.backgroundColorByHexString('#f3f3f3');
            splashScreen.hide();

            if ( exist ) {
              this.rootPage = HomePage;
            } else {
              this.rootPage = LoginPage;
            }
          })
    });
  }
}

