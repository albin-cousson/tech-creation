import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ApiService } from '../services/api.service'
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { UserSpacePage } from '../pages/user-space/user-space';
import { AccueilPage } from '../pages/accueil/accueil';
import { ActuPage } from '../pages/actu/actu';
import { TabsPage } from '../pages/tabs/tabs'

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    SignUpPage,
    UserSpacePage,
    AccueilPage,
    ActuPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    SignUpPage,
    UserSpacePage,
    AccueilPage,
    ActuPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
