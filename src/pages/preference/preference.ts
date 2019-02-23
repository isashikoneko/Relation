import { TabsPage } from './../tabs/tabs';
import { RegisterPage } from './../register/register';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the PreferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-preference',
  templateUrl: 'preference.html',
})
export class PreferencePage {

  user_id:any;
  category:any;
  loading:any;
  preference:any;
  empty:boolean = true;
  selected:any;

  email:any;
  password:any;
  postData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.preference = new Array();
    this.selected = new Array();

    this.email = this.navParams.get("email");
    this.password = this.navParams.get("password");
    this.postData = this.navParams.get("postData");
  }

  ionViewDidEnter()
  {
    this.load() 
  }

  public load()
  {
    this.showLoading("Please wait")
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = new FormData()
    postData.append('id', this.user_id)

    console.log("Send method post:")

    this.http.post("http://127.0.0.1/Relation/getCategory.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data); 

      if (data['error'] == "")
      {
        this.category = data['category'];
        for (const key in this.category) {
          this.selected.push(false);
        }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencePage');
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

  public select(id, i)
  {
    let index = this.preference.indexOf(id);
    if (index == -1) 
    { 
      console.log("select " + id);
      this.preference.push(id);
      this.selected[i] = true;
    }
    else
    {
      console.log("deselect " + id)
      this.preference.splice(index, 1)
      this.selected[i] = false;
    }
  }

  public next()
  {
    this.showLoading("Please wait")

    this.postData.append("preference", this.preference);

    this.http.post("http://127.0.0.1/Relation/register.php", this.postData).subscribe(data => {
      console.log(data);

      if (data['error'] == "")
      {
        let id = data['id']

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(result => {
          this.hideLoading()
          this.navCtrl.push(TabsPage, {id: id})
        }).catch(function(error) {
          let error_message = error.message
          console.log(error_message)
          this.hideLoading()
          this.showFailAlert("Registration failed", error_message, ['OK'])
        })

      }
      else
      {
        this.hideLoading()
        this.showFailAlert("Registration failed", data['error'], ['OK']) 
      }

    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Registration failed", "Cannot reach server", ['OK'])
    });
  }

  public previous()
  {
    this.navCtrl.pop()
  }

}
