import { DetailAdPage } from './../detail-ad/detail-ad';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ad_list:any
  user_id:any
  loading:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
    console.log(this.navParams.data)
    this.user_id = this.navParams.data.user_id
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateHomePage');    
  }

  ionViewDidEnter()
  {
    this.loadAd() 
  }

  public detail(id)
  {
    console.log('show detail of' + id);
    console.log('show detail of' + this.ad_list[id].name); 
    this.navCtrl.push(DetailAdPage, {ad: this.ad_list[id], id: this.user_id}); 
  }

  public loadAd(){

    this.showLoading("Please wait")
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = new FormData()
    postData.append('id', this.user_id)

    console.log("Send method post:")

    this.http.post("http://127.0.0.1/Relation/getAnnonce.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data); 

      if (data['error'] == "")
      {
        this.ad_list = data['ads']
        this.hideLoading()
      }
      else
      {
        this.hideLoading()
        this.showFailAlert("Ads cannot be loaded", data['error'], ['OK'])
      }
      
    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Ads loading failed", "Cannot reach server", ['OK'])
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
