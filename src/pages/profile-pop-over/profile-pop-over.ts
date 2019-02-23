import { PaymentPage } from './../payment/payment';
import { SettingPage } from './../setting/setting';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile-pop-over',
  templateUrl: 'profile-pop-over.html',
})
export class ProfilePopOverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePopOverPage');
  }

  public save()
  {

  }

  public money()
  {
    this.navCtrl.push(PaymentPage);
  }

  public setting()
  {
    this.navCtrl.push(SettingPage);
  }

}
