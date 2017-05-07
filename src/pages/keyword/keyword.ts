import {Component} from "@angular/core";
import {ToastController, ViewController, Platform, NavParams, NavController} from "ionic-angular";


@Component({
  selector: 'page-keyword',
  templateUrl: 'keyword.html'
})

export class KeywordPage {
  keyword: string;
  link: string;
  mode: string;
  keywords: any;
  emotions: any;

  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
    this.keyword = "Planet";
    this.link = "http://www.baidu.com";
    this.mode = "emotion";
    this.emotions = [
      {
        text: 'Joy',
        rate: 0.11
      },
      {
        text: 'Anger',
        rate: 0.25
      },
      {
        text: 'Disgust',
        rate: 0.56
      },
      {
        text: 'Sadness',
        rate: 0.32
      }
    ];
    this.keywords = [
      {
        text: "desert ship",
        rate: 0.986974
      },
      {
        text: "rugged Colorado Desert",
        rate: 0.929987
      },
      {
        text: "librarian Myrtle Botts",
        rate: 0.906193
      },
      {
        text: "Canebrake Canyon",
        rate: 0.862232
      },
      {
        text: "Desert Dunes motel",
        rate: 0.857937
      },
      {
        text: "Albert S. Evans",
        rate: 0.849984
      },
      {
        text: "Southern California",
        rate: 0.846389
      },
      {
        text: "ancient American dreamtime",
        rate: 0.832077
      },
      {
        text: "World Trade Center",
        rate: 0.829048
      },
      {
        text: "treasure ship",
        rate: 0.795706
      },
      {
        text: "Anza-Borrego Desert",
        rate: 0.79023
      },
      {
        text: "ship Evans",
        rate: 0.783095
      },
      {
        text: "Viking ship",
        rate: 0.779065
      }
    ];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
