import {Component} from "@angular/core";
import {ToastController, ViewController, Platform, NavParams, NavController} from "ionic-angular";
import {DataService} from "../../app/services/data.service";


@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})

export class SummaryPage {
  emotions: any;
  sentiment: string;
  text: string;
  cloudImgSrc: string;

  constructor(public toastCtrl: ToastController,
              public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public navCtrl: NavController,
              private dataService: DataService) {

    this.text = "";
    for (let post of this.dataService.allPosts) {
      this.text += post.text + " ";
    }
    let re = /[^A-Za-z0-9!\.]/;
    this.text = this.text.replace(re, " ");
    console.log("In SummaryPage constructor: all text (after filter)= \n" + this.text);

    let page = this;
    let isCallCloud = false;// set as true when presentation.
    page.cloudImgSrc = "https://www.teamtempapp.com/wc/89c1d5d5-f680-44ff-b1de-90706cfa4bd9.png";
    if(isCallCloud) {
      this.dataService.getWordCloud(this.text).map(res => res.json()).subscribe(obj => {
        let url = obj.url;
        if (url) {
          page.cloudImgSrc = url;
        }
      });
    }

    let sentimentScore = 0;
    let emoResult: Emotion;
    this.dataService.getWatsonNLPAnalysis(this.text).map(res => res.json()).subscribe(obj => {
      emoResult = obj.keywords[0].emotion;
      this.emotions = [
        {
          text: 'Joy',
          rate: emoResult.joy,
          iconName: 'happy',
          color: 'energized'
        },
        {
          text: 'Anger',
          rate: emoResult.anger,
          iconName: 'flame',
          color: 'danger'
        },
        {
          text: 'Disgust',
          rate: emoResult.disgust,
          iconName: 'freebsd-devil',
          color: 'dark'
        },
        {
          text: 'Sadness',
          rate: emoResult.sadness,
          iconName: 'sad',
          color: 'optionblue'
        }
      ];
      sentimentScore = obj.keywords[0].sentiment.score;
    });

    if (sentimentScore < -0.2) {
      this.sentiment = "Negative";
    } else if (sentimentScore > 0.2) {
      this.sentiment = "Positive";
    } else {
      this.sentiment = "Neutral";
    }
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
