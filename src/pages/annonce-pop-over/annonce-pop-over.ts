import { ProfilePage } from './../profile/profile';
import { HttpClient } from '@angular/common/http';
import { OfferPage } from './../offer/offer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the AnnoncePopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-annonce-pop-over',
  templateUrl: 'annonce-pop-over.html',
})
export class AnnoncePopOverPage {

  ad:any;
  loading:any;
  users_id:any;

  is_creator: boolean;
  sub: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
    this.ad = navParams.get('ad')
    this.users_id = navParams.get('id');
    this.sub = navParams.get('sub')

    /* if (this.ad['created_by'] == this.users_id)
    {
      this.is_creator = true;
    }
    else
    {
      this.is_creator = false;
    } */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnoncePopOverPage');
  }

  public modifier()
  {
    this.navCtrl.setRoot(OfferPage, {data: this.ad});
  }

  public remove()
  {
    this.showLoading("Please wait")

    let postData = new FormData()
    postData.append('id', this.ad.id)

    console.log("Send method post:");

    console.log(postData)

    this.http.post("http://127.0.0.1/Relation/removeAd.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data);

      this.hideLoading()

      if (data['error'] == "")
      {
        this.showFailAlert("Suppresion effectue", "La suppresion a ete effectue avec succes", ['OK'])
        this.navCtrl.push(ProfilePage, {id: this.users_id});
      }
      else
      {
        this.showFailAlert("Suppresion echoue", data['error'], ['OK'])
      }
      
    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Removing failed", "Cannot reach server", ['OK'])
    });
  }

  public share()
  {

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
