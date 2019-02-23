import { ProfilePage } from './../profile/profile';
import { HttpClient } from '@angular/common/http';
import { AnnoncePopOverPage } from './../annonce-pop-over/annonce-pop-over';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the DetailAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-ad',
  templateUrl: 'detail-ad.html',
})
export class DetailAdPage {

  ad: any
  user_id: any;
  popover:any;
  is_creator:boolean;

  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
    this.ad = navParams.get("ad");
    this.user_id = navParams.get('id');
    let sub = navParams.get('sub');
    this.popover = this.popoverCtrl.create(AnnoncePopOverPage, {ad: this.ad, id: this.user_id, sub: sub});

    if (this.ad['created_by'] == this.user_id)
    {
      this.is_creator = true;
    }
    else
    {
      this.is_creator = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailAdPage'); 
  }

  public openPopover(event)
  {
    this.popover.present({
      ev: event
    });
  }

  public subscribe()
  {
    this.showLoading("Please wait")

    let postData = new FormData()
    postData.append('ad_id', this.ad.id);
    postData.append('user_id', this.user_id);

    console.log("Send method post:");

    console.log(postData)

    this.http.post("http://127.0.0.1/Relation/subscribe.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data);

      this.hideLoading()

      if (data['error'] == "")
      {
        this.showFailAlert("Souscription effectue", "La souscription a ete effectue avec succes", ['OK'])
        this.navCtrl.setRoot(ProfilePage, {id: this.user_id});
      }
      else
      {
        this.showFailAlert("Souscription echoue", data['error'], ['OK'])
      }
      
    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Removing failed", "Cannot reach server", ['OK'])
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
