import { AnnoncePage } from './../annonce/annonce';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { OfferPage } from '../offer/offer';

/**
 * Generated class for the RechargeAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-offer',
  templateUrl: 'create-offer.html',
})
export class CreateOfferPage {

  data: any; 
  loading:any 
  prime:any 
  users_id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public http: HttpClient, public alertCtrl: AlertController) {
    this.data = this.navParams.get("data");
    this.prime = this.navParams.get("prime");
    this.users_id = this.data.get('id');
    console.log(this.prime)
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargeAccountPage');
  }

  public pay(way)
  {
    this.showLoading("Please wait")

    let postData = this.data;
    postData.append('pay_ways', way);

    console.log("Send method post:");

    console.log(postData)

    this.http.post("http://127.0.0.1/Relation/createAnnonce.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data);

      this.hideLoading()

      if (data['error'] == "")
      {
        this.navCtrl.setRoot(OfferPage, {ad: data['annonce'], id: this.users_id})
      }
      else
      {
        this.showFailAlert("Ad cannot be created", data['error'], ['OK'])
      }
      
    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Ad creating failed", "Cannot reach server", ['OK'])
    });

  }

  public showLoading(content)
  {
    this.loading = this.loadingCtrl.create({
      content: content
    })

    this.loading.present()
  }

  public hideLoading()
  {
    this.loading.dismiss()
  }

  public showFailAlert(title, subtTitle, button)
  {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtTitle,
      buttons: button,
    })

    alert.present()
  }

}
