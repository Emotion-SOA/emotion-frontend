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

  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private dataService: DataService
  ) {
    // TODO: replace text
    this.text = "IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries."
    this.dataService.getWatsonNLPAnalysis(this.text).subscribe(res => {
      console.log(res.json());
      this.toastCtrl.create({message: 'Check console\'s log\n',
        duration: 3000, position: 'middle'}).present();
    })
    
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
