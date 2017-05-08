import {Component} from "@angular/core";
import {ToastController, ViewController, Platform, NavParams, NavController} from "ionic-angular";
import {DataService} from "../../app/services/data.service";


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
  emoResult: Emotion;

  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public dataService: DataService
  ) {
    //invoke Watson
    let text = this.params.get("text");
    let re = /[^A-Za-z0-9!\.]/;
    text = text.replace(re, " ");
    this.dataService.getWatsonNLPAnalysis(text).subscribe(res => {
      console.log("Keyword: \n" + res.json());
      this.toastCtrl.create({message: 'Check console\'s log\n',
        duration: 3000, position: 'middle'}).present();
    });
    //invoke Google Vision
    this.keyword = "Planet";
    this.link = "http://www.baidu.com";
    this.mode = "emotion";
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

interface Emotion {
  anger: number;
  disgust: number;
  fear: number;
  joy: number;
  sadness: number;
}
