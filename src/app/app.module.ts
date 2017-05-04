import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {DetailPostPage} from "../pages/detailpost/detailpost";
import {ProfilePage} from "../pages/profile/profile";
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { EmotionPage } from '../pages/emotion/emotion';
import { PostPage } from '../pages/post/post';
import { TracksPage } from '../pages/tracks/tracks';
import {VisionService} from './services/vision.service';
import {NlpService} from './services/nlp.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    EmotionPage,
    PostPage,
    TracksPage,
    DetailPostPage,
    ProfilePage
  ],
  imports: [
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
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VisionService,
    NlpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
