import { ProfilePopOverPage } from './../pages/profile-pop-over/profile-pop-over';
import { AnnoncePopOverPage } from './../pages/annonce-pop-over/annonce-pop-over';

import { PreferencePage } from './../pages/preference/preference';
import { SettingPage } from './../pages/setting/setting';
import { AnnoncePage } from './../pages/annonce/annonce';
import { DetailAdPage } from './../pages/detail-ad/detail-ad';
import { CreateOfferPage } from './../pages/create-offer/create-offer';
import { SearchPage } from './../pages/search/search';
import { ProfilePage } from './../pages/profile/profile';
import { PaymentPage } from './../pages/payment/payment';
import { OfferPage } from './../pages/offer/offer';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { StartPage } from './../pages/start/start';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    StartPage,
    LoginPage,
    RegisterPage,
    OfferPage,
    PaymentPage,
    ProfilePage,
    SearchPage,
    CreateOfferPage,
    DetailAdPage,
    AnnoncePage,
    SettingPage,
    PreferencePage,
    AnnoncePopOverPage,
    ProfilePopOverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    StartPage,
    LoginPage,
    RegisterPage,
    OfferPage,
    PaymentPage,
    ProfilePage,
    SearchPage,
    CreateOfferPage,
    DetailAdPage,
    AnnoncePage,
    SettingPage,
    PreferencePage,
    AnnoncePopOverPage,
    ProfilePopOverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    FileTranfer,
    FileUploadOptions,
    FileTransferObject,
    File,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
