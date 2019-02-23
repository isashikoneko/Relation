import { AnnoncePopOverPage } from './../annonce-pop-over/annonce-pop-over';
import { ProfilePage } from './../profile/profile';
import { OfferPage } from './../offer/offer';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, PopoverController } from 'ionic-angular';

/**
 * Generated class for the AnnoncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-annonce',
  templateUrl: 'annonce.html',
})
export class AnnoncePage {

  ad:any;
  users_id:any;
  popover:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.ad = navParams.get('ad')
    this.users_id = navParams.get('id');
    this.popover = this.popoverCtrl.create(AnnoncePopOverPage, {ad: this.ad, id: this.users_id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnoncePage');
  }

  public openPopover(event)
  {
    this.popover.present({
      ev: event
    });
  }

}
