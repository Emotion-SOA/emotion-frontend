import {Component} from "@angular/core";
import {ToastController, ViewController, Platform, NavParams, NavController} from "ionic-angular";
import {DataService} from "../../app/services/data.service";

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  userID: Number;
  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private dataService: DataService
  ) {
    // this.userID = this.params.get("userID");
  }

  post() {
    // Post ...
    // Success.
    this.dataService.addPost("add-post-test", "/image/0.png", 23.123, 32.321).subscribe(res => {
      console.log(res.json());
      this.toastCtrl.create({message: 'Check console\'s log\n',
        duration: 3000, position: 'middle'}).present();
    });
    let toast = this.toastCtrl.create({
      message: 'Post successfully',
      duration: 3000,
      position: 'middle'

    });
    toast.present();
    //store into DB
    //this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
