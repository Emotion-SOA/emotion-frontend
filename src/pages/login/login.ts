import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {EmotionPage} from "../emotion/emotion";
import {DataService} from "../../app/services/data.service";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  password: string;
  user: {token: string, userID: Number};

  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController,
              private dataService: DataService) {
  }

  openPage(page: string) {
    if (page == 'login') {
      // console.log('email=' + this.email + '\npassword=' + this.password);
      // let result = this.dataService.login(this.email, this.password);
      // result.subscribe(res => {
      //   if (res.json().error) {
      //     this.toastCtrl.create({
      //       message: 'Login failed.',
      //       duration: 3000, position: 'middle'
      //     }).present();
      //   } else {
      //     this.navCtrl.setRoot(EmotionPage);
      //   }
      // }, err => {
      //   this.toastCtrl.create({message: 'Server error', duration: 3000}).present();
      // });
      this.navCtrl.setRoot(EmotionPage);
    }
    else {
      this.navCtrl.setRoot(RegisterPage);
    }
  }
}
