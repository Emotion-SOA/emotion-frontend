import {Component} from "@angular/core";
import {NavController, NavParams, ToastController} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {EmotionPage} from "../emotion/emotion";
import {DataService} from "../../app/services/data.service";
import {Http} from '@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  password: string;

  constructor(public toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, private dataService: DataService, private http: Http) {
  }

  openPage(page: string) {
    if (page == 'login') {
      console.log('email=' + this.email + '\npassword=' + this.password);
      let result = this.dataService.login(this.email, this.password);
      result.subscribe(res => {
        if (res.json().error) {
          this.toastCtrl.create({message: 'Login failed.', 
            duration: 3000, position: 'middle'}).present();
        } else {
          this.navCtrl.setRoot(EmotionPage);
        }
      }, err => {
        this.toastCtrl.create({message: 'Server error', duration: 3000}).present();
      });
    }
    else {
      this.navCtrl.setRoot(RegisterPage);
    }
  }
}
