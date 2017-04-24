import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  constructor(public toastCtrl: ToastController) {
  }

  register() {
    // Register ...

    // Success.
    let toast = this.toastCtrl.create({
      message: 'Registered successfully',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
