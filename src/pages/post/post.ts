import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  constructor(public toastCtrl: ToastController) {
  }

  post() {
    // Post ...
    // Success.
    let toast = this.toastCtrl.create({
      message: 'Post successfully',
      duration: 3000,
      position: 'middle'

    });
    toast.present();
  }
}
