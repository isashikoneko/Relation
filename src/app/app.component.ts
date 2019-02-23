import { LoginPage } from './../pages/login/login';
import { AboutPage } from './../pages/about/about';
import { SettingPage } from './../pages/setting/setting';
import { StartPage } from './../pages/start/start';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = StartPage;
  config = {
    apiKey: "AIzaSyBqwRggzbzlsyyplU_JoPBXLl8JNsmbCT0",
    authDomain: "relation-8dbc1.firebaseapp.com",
    databaseURL: "https://relation-8dbc1.firebaseio.com",
    projectId: "relation-8dbc1",
    storageBucket: "relation-8dbc1.appspot.com",
    messagingSenderId: "735551573745"
  }

  @ViewChild(Nav) content: Nav;

  page:Array<{title:string, component:any, icon:string}> = [
    {title: "Home", component: TabsPage, icon: "home"},
    {title: "setting", component: SettingPage, icon: "settings"},
    {title: "About", component: AboutPage, icon: "information-circle"},
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.page = [
      {title: "Home", component: TabsPage, icon: "home"},
      {title: "setting", component: SettingPage, icon: "settings"},
      {title: "About", component: AboutPage, icon: "information-circle"},
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      firebase.initializeApp(this.config)
      
    });
  }

  public openPage(p)
  {
    this.content.setRoot(p.component);
  }

  public logOut()
  {
    if (firebase.auth().currentUser == null)
    {
      console.log('no user to log out');
    }
    else
    {
      firebase.auth().signOut().then(function () {
          
      }).catch(function (error) {
          // An error happened.
          console.log(error);
      });

      this.content.setRoot(LoginPage);
      
    }
  }
}
