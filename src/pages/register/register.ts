import { Component } from '@angular/core';
import {ToastController, NavController} from 'ionic-angular';
import {EmotionPage} from '../emotion/emotion';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  constructor(public toastCtrl: ToastController, public navCtrl: NavController) {
  }

  openPage(page: string) {
    if (page == 'emotion') {
      // Register ...
      // Success.
      let toast = this.toastCtrl.create({
        message: 'Registered successfully',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      //TODO: if not success?
      this.navCtrl.setRoot(EmotionPage);
    } else {
      this.navCtrl.setRoot(LoginPage);
    }

  }

}
