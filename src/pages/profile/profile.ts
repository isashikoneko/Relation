import { ProfilePopOverPage } from './../profile-pop-over/profile-pop-over';
import { DetailAdPage } from './../detail-ad/detail-ad';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:any;
  annonce:any;
  popover:any;
  user_id:any;

  state:any;

  annonceData:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
    this.user_id = this.navParams.data.user_id
    this.user = new Array();
    this.state = "en-cours";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter()
  {
    this.loadData();
  }

  public loadData()
  {

    this.showLoading("Please wait")
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
 
    let postData = new FormData()
    postData.append('id', this.user_id)

    console.log("Send method post:")

    this.http.post("http://127.0.0.1/Relation/getProfile.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data); 

      if (data['error'] == "")
      {
        this.annonceData = data['annonce']
        this.user = data['user'];
        this.popover = this.popoverCtrl.create(ProfilePopOverPage, {ad: this.annonce, id: this.user.id});
        this.annonce = this.annonceData.enCours;
        this.hideLoading()
      }
      else
      {
        this.hideLoading()
        this.showFailAlert("Data cannot be loaded", data['error'], ['OK'])
      }
      
    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Data loading failed", "Cannot reach server", ['OK'])
    });

  }

  public getEnCours()
  {
    this.annonce = this.annonceData.enCours;
  }

  public getValide()
  {
    this.annonce = this.annonceData.valide;
  }

  public getAnnule()
  {
    this.annonce = this.annonceData.annule;
  }

  public openPopover(event)
  {
    this.popover.present({
      ev: event
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

  public detail(i)
  {
    this.navCtrl.push(DetailAdPage, {ad: this.annonce[i], id: this.user_id, sub: true}); 
  }

  public validate(i)
  {

  }

  public annulate(i)
  {

  }

  public archivate(i)
  {

  }

  public delete(i)
  {

  }

}
