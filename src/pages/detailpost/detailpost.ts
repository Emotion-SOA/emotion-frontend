import { Component } from '@angular/core';
import { ModalController, ToastController , ViewController, Platform, NavParams, NavController} from 'ionic-angular';
import {KeywordPage} from '../keyword/keyword';

@Component({
  selector: 'page-detailpost',
  templateUrl: 'detailpost.html'
})
export class DetailPostPage {
  post;
  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {
    this.post =
      {icon: "imgs/img0.jpeg",
        img: "imgs/menu.jpg",
        text: "Lorem ipsum dolor sit amet, ligula suspendisse nulla pretium, rhoncus tempor placerat fermentum, enim integer ad vestibulum volutpat. Nisl rhoncus turpis est, vel elit, congue wisi enim nunc ultricies sit, magna tincidunt. Maecenas aliquam maecenas ligula nostra, accumsan taciti. Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat nec pellentesque leo, temporibus scelerisque nec.",
        location: "Zhang Jiang",
        time: 'April 25, 2017'};
  }

  analyze() {
    let modal = this.modalCtrl.create(KeywordPage);
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
