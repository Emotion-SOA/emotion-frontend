import {Component} from "@angular/core";
import {NavController, NavParams, ToastController} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {EmotionPage} from "../emotion/emotion";
import {DataService} from "../../app/services/data.service";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [DataService]
})
export class LoginPage {
  email: string;
  password: string;
  user: {token: string, userID: Number};

  constructor(public toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, private dataService: DataService) {
  }

  openPage(page: string) {
    if (page == 'login') {
      console.log('email=' + this.email + '\npassword=' + this.password);
      //subscribe(user => {
    //   this.user = user;
    //   alert(this.user.token);
    // });
      let result = this.dataService.postLogin(this.email, this.password);
      console.log(result);
      // this.navCtrl.setRoot(EmotionPage, {token: this.user.token});
    }
    else {
      this.navCtrl.setRoot(RegisterPage);
    }
  }
}
