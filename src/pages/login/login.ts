import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {EmotionPage} from "../emotion/emotion";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  openPage(page: string) {
    if (page == 'login')
      this.navCtrl.setRoot(EmotionPage);
    else
      this.navCtrl.setRoot(RegisterPage);
  }
}
