import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
// import { ItemDetailsPage } from '../pages/item-details/item-details';
// import { ListPage } from '../pages/list/list';
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
    TracksPage
    // HelloIonicPage,
    // ItemDetailsPage,
    // ListPage
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
    TracksPage
    // HelloIonicPage,
    // ItemDetailsPage,
    // ListPage
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
