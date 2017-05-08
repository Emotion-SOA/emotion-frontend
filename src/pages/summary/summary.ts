import {Component} from "@angular/core";
import {ToastController, ViewController, Platform, NavParams, NavController} from "ionic-angular";
import {DataService} from "../../app/services/data.service";


@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})

export class SummaryPage {
  emotions: any;
  emoResult: Emotion;
  sentiment: string;
  text: string;

  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private dataService: DataService
  ) {
    this.text = "";
    for (let post of this.dataService.allPosts) {
      this.text += post.text + " ";
    }
    // TODO: filter text
    let re = /[^A-Za-z0-9!\.]/;
    this.text = this.text.replace(re, " ");
    console.log("In SummaryPage constructor: all text (after filter)= \n" + this.text);
    let sentimentScore = 0;
    this.dataService.getWatsonNLPAnalysis(this.text).map(res => res.json()).subscribe(obj => {
      console.log(obj);
      this.emoResult = obj.keywords[0].emotion;
      sentimentScore = obj.keywords[0].sentiment.score;
      this.toastCtrl.create({message: 'Check console\'s log\n',
        duration: 3000, position: 'middle'}).present();
    });

    if (sentimentScore < -0.2) {
      this.sentiment = "Negative";
    } else if (sentimentScore > 0.2) {
      this.sentiment = "Positive";
    } else {
      this.sentiment = "Neutral";
    }
    this.emotions = [
      {
        text: 'Joy',
        rate: this.emoResult.joy,
        iconName: 'happy',
        color: 'energized'
      },
      {
        text: 'Anger',
        rate: this.emoResult.anger,
        iconName: 'flame',
        color: 'danger'
      },
      {
        text: 'Disgust',
        rate: this.emoResult.disgust,
        iconName: 'freebsd-devil',
        color: 'dark'
      },
      {
        text: 'Sadness',
        rate: this.emoResult.sadness,
        iconName: 'sad',
        color: 'optionblue'
      }
    ];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

interface Emotion {
  anger: number;
  disgust: number;
  fear: number;
  joy: number;
  sadness: number;
}
