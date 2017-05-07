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
  username: string;
  email: string;
  password: string;
  

  constructor(public toastCtrl: ToastController, public navParams: NavParams, public navCtrl: NavController, private dataService: DataService) {
  }

  openPage(page: string) {
    if (page == 'emotion') {
      let result = this.dataService.register(this.username, this.email, this.password);
      result.subscribe(res => {
        if (res.json().error) {
          this.toastCtrl.create({message: 'Register failed.\n The email is registered or invalid.', 
            duration: 3000, position: 'middle'}).present();
        } else {
          let toast = this.toastCtrl.create({
            message: 'Registered successfully',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.navCtrl.setRoot(EmotionPage);
        }
      }, err => {
        this.toastCtrl.create({message: 'Server error', duration: 3000}).present();
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }

  }

}
