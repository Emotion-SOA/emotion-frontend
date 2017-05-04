import { Component } from '@angular/core';
import { ToastController , ViewController, Platform, NavParams, NavController} from 'ionic-angular';
import {EmotionPage} from '../emotion/emotion';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  userID: Number;
  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
    // this.userID = this.params.get("userID");
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
    //store into DB
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
