import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tracks',
  templateUrl: 'tracks.html'
})
export class TracksPage {
  tracks;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tracks = [
      {icon: "imgs/img0.jpeg",
        img: "imgs/menu.jpg",
        text: "Like a dog, like a god.",
        location: "Zhang Jiang",
        time: 'April 25, 2017'},
      {icon: "imgs/img0.jpeg",
        img: "imgs/menu.jpg",
        text: "Panda Eyes, Panda Eyes, Panda Eyes...",
        location: "Zhang Jiang",
        time: 'April 24, 2017'}
    ];
  }

}
