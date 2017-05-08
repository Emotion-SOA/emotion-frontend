import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {DataService} from "../../app/services/data.service"

@Component({
  selector: 'page-tracks',
  templateUrl: 'tracks.html'
})
export class TracksPage {
  tracks;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataService) {
    this.tracks = this.dataService.allPosts;
    this.tracks = [
      {icon: "imgs/logo.jpeg",
        img: "imgs/menu.jpg",
        text: "Like a dog, like a god.",
        location: "Zhang Jiang",
        time: 'April 25, 2017'},
      {icon: "imgs/logo.jpeg",
        img: "imgs/menu.jpg",
        text: "Panda Eyes, Panda Eyes, Panda Eyes...",
        location: "Zhang Jiang",
        time: 'April 24, 2017'}
    ];
  }

}
