import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {KeywordPage} from "../pages/keyword/keyword";
import {DetailPostPage} from "../pages/detailpost/detailpost";
import {ProfilePage} from "../pages/profile/profile";
import {SummaryPage} from "../pages/summary/summary";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {EmotionPage} from "../pages/emotion/emotion";
import {PostPage} from "../pages/post/post";
import {TracksPage} from "../pages/tracks/tracks";
import {VisionService} from "./services/vision.service";
import {NlpService} from "./services/nlp.service";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Camera} from "@ionic-native/camera";
import {Transfer} from "@ionic-native/transfer";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    EmotionPage,
    PostPage,
    TracksPage,
    DetailPostPage,
    ProfilePage,
    KeywordPage,
    SummaryPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    EmotionPage,
    PostPage,
    TracksPage,
    DetailPostPage,
    ProfilePage,
    KeywordPage,
    SummaryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VisionService,
    NlpService,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
