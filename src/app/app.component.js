var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { NlpService } from "./services/nlp.service";
import { Platform, MenuController, Nav } from "ionic-angular";
// import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
// import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { PostPage } from "../pages/post/post";
import { EmotionPage } from "../pages/emotion/emotion";
import { TracksPage } from "../pages/tracks/tracks";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        // make LoginPage the root (or first) page
        this.rootPage = LoginPage;
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Login', component: LoginPage },
            // { title: 'Hello Ionic', component: HelloIonicPage },
            // { title: 'My First List', component: ListPage }
            { title: 'Register', component: RegisterPage },
            { title: 'Emotion', component: EmotionPage },
            { title: 'Post', component: PostPage },
            { title: 'Tracks', component: TracksPage }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [NlpService]
    }),
    __metadata("design:paramtypes", [Platform,
        MenuController,
        StatusBar,
        SplashScreen])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map