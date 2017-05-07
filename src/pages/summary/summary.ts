import {Component} from "@angular/core";
import {ToastController, ViewController, Platform, NavParams, NavController} from "ionic-angular";


@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})

export class SummaryPage {
  emotions: any;
  sentiment: string;

  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
    this.sentiment = 'Negative';
    this.emotions = [
      {
        text: 'Joy',
        rate: 0.11,
        iconName: 'happy',
        color: 'energized'
      },
      {
        text: 'Anger',
        rate: 0.25,
        iconName: 'flame',
        color: 'danger'
      },
      {
        text: 'Disgust',
        rate: 0.56,
        iconName: 'freebsd-devil',
        color: 'dark'
      },
      {
        text: 'Sadness',
        rate: 0.32,
        iconName: 'sad',
        color: 'optionblue'
      }
    ];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
