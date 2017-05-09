import {Component} from "@angular/core";
import {ModalController, ToastController, ViewController, Platform, NavParams} from "ionic-angular";
import {KeywordPage} from "../keyword/keyword";
import {DataService} from "../../app/services/data.service";

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
    public modalCtrl: ModalController,
    private dataService: DataService
  ) {
    this.post =
      {icon: "imgs/logo.jpeg",
        img: this.params.get("imagePath"),
        text: this.params.get("text"),
        location: this.params.get("address"),
        time: 'April 25, 2017'};
    console.log(this.post);
    console.log(this.params.data);
  }

  analyze() {
    if (this.post.text.length < 50) {
      console.log("Too short text!");
      this.toastCtrl.create({message: 'Too short text!',
        duration: 3000, position: 'middle'}).present();
    } else {
      let modal = this.modalCtrl.create(KeywordPage, {text: this.post.text});
      modal.present();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
