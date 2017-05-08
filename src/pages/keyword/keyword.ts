import {Component} from "@angular/core";
import {ToastController, ViewController, Platform, NavParams} from "ionic-angular";
import {DataService} from "../../app/services/data.service";


@Component({
  selector: 'page-keyword',
  templateUrl: 'keyword.html',
  providers: [DataService]
})

export class KeywordPage {
  keyword: string;
  link: string;
  mode: string;
  keywords: any;
  emotions: any;
  emoResult: Emotion;

  constructor(public toastCtrl: ToastController,
              public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public dataService: DataService) {
    //invoke Watson
    let text = this.params.get("text");
    let re = /[^A-Za-z0-9!\.]/;
    text = text.replace(re, " ");

    this.dataService.getWatsonNLPAnalysis(text).map(res => res.json()).subscribe(obj => {
      console.log("Keyword: \n" + obj);
      this.emoResult = obj.keywords[0].emotion;
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
      this.keywords = obj.keywords;
    });

    //invoke Google Vision
    this.keyword = "Planet";
    this.link = "http://www.baidu.com";
    this.mode = "emotion";
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
