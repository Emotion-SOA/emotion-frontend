import {Component, ViewChild} from "@angular/core";
import {DataService} from "./services/data.service"
import {Platform, MenuController, Nav} from "ionic-angular";
import {LoginPage} from "../pages/login/login";
import {EmotionPage} from "../pages/emotion/emotion";
import {ProfilePage} from "../pages/profile/profile";
import {TracksPage} from "../pages/tracks/tracks";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";


@Component({
  templateUrl: 'app.html',
  providers: [DataService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make LoginPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{title: string, component: any, iconName?: string, color?: string}>;

  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Emotion', component: EmotionPage, iconName: 'ionic', color: 'energized'},
      {title: 'Tracks', component: TracksPage, iconName: 'recording', color: 'calm'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  showProfile() {
    this.menu.close();
    this.nav.push(ProfilePage);
  }

  logout() {
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }
}
