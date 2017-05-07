import {Component} from "@angular/core";
import {ToastController, NavController, NavParams} from "ionic-angular";
import {EmotionPage} from "../emotion/emotion";
import {LoginPage} from "../login/login";
import {DataService} from "../../app/services/data.service";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  email: string;
  password: string;
  user: {token: string, userID: Number};

  constructor(public toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, private dataService: DataService) {
  }

  openPage(page: string) {
    if (page == 'emotion') {
      // Register ...
      // Success.
      let toast = this.toastCtrl.create({
        message: 'Registered successfully',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      //TODO: if not success?
      this.navCtrl.setRoot(EmotionPage);
    } else {
      this.navCtrl.setRoot(LoginPage);
    }

  }

}
