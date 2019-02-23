import { PreferencePage } from './../preference/preference';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  myForm:any
  loading:any
  pref:any;
  type:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private http: HttpClient, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.myForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(15)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      rePassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      sexe: ['', Validators.required],
      type: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
      email: ['', Validators.compose([Validators.maxLength(100), Validators.required])]
    })

    this.pref = this.navParams.get("pref");

  }

  register()
  {
    //this.showLoading("Please wait")

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    //const requestOptions = new RequestOptions({ headers: headers });

    let postData = new FormData()
    postData.append("name", this.myForm.value.name)
    postData.append("email", this.myForm.value.email)
    postData.append("username", this.myForm.value.username)
    postData.append("phone", this.myForm.value.phone)
    postData.append("city", this.myForm.value.city)
    postData.append("country", this.myForm.value.country)
    postData.append("type", this.myForm.value.type)
    postData.append("sexe", this.myForm.value.sexe)
    postData.append("preference", this.pref)

    console.log(this.myForm.value.email)

    this.navCtrl.push(PreferencePage, {postData: postData, email: this.myForm.value.email, password: this.myForm.value.password})

    /* this.http.post("http://127.0.0.1/Relation/register.php", postData).subscribe(data => {
      console.log(data);

      if (data['error'] == "")
      {
        id = data['id']

        firebase.auth().createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(result => {
          this.navCtrl.push(TabsPage, {id: id})
          this.hideLoading()
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
    }); */

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.loadType();
  }

  public loadType()
  {
    this.showLoading("Please wait")
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = new FormData()

    console.log("Send method post:")

    this.http.post("http://127.0.0.1/Relation/getType.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data);

      if (data['error'] == "")
      {
        this.type = data['type'] 
        this.hideLoading()
      }
      else
      {
        this.hideLoading()
        this.showFailAlert("Type cannot be loaded", data['error'], ['OK'])
      }
      
    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Type loading failed", "Cannot reach server", ['OK'])
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
