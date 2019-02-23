import { PreferencePage } from './../preference/preference';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { TabsPage } from './../tabs/tabs';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Http, RequestOptionsArgs } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myForm:any
  loading:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: HttpClient, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.myForm = formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login()
  {
    this.showLoading("Please wait")

    let email
    let id
    let type
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    /* let postData = JSON.stringify({
      phone : this.myForm.phone
    }) */

    console.log(this.myForm.value) 

    let postData = new FormData()
    postData.append('phone', this.myForm.value.phone)

    console.log("Send method post:")

    this.http.post("http://127.0.0.1/Relation/login.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data);

      if (data['error'] == "")
      {
        email = data['email']
        id = data['id']
        type = data['type']

        this.navCtrl.push(TabsPage, {id: id, type: type})
        this.hideLoading()

        /* firebase.auth().signInWithEmailAndPassword(email, this.myForm.value.password).then(result => {
          console.log(type)
          this.navCtrl.push(TabsPage, {id: id, type: type})
          this.hideLoading()
        }, error => {
          let error_message = error.message
          console.log(error_message)
          this.hideLoading()
          this.showFailAlert("Connexion failed", error_message, ['OK'])
        }) */

      }
      else
      {
        this.hideLoading()
        this.showFailAlert("Connexion failed", data['error'], ['OK'])
      }
      
    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Connexion failed", "Cannot reach server", ['OK'])
    });

  }

  public loginFacebook()
  {
    let provider = new firebase.auth.FacebookAuthProvider()

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      this.showFailAlert("Facebook connexion failed", "Your account not registred", ['OK'])
    });
  }

  public forgotPassword()
  {

    this.showPrompt()

  }

  public showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Mot de passe oublie',
      message: "Entrer votre addresse email:",
      inputs: [
        {
          name: 'email',
          placeholder: 'email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Annule', 
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoye',
          handler: data => {
            firebase.auth().sendPasswordResetEmail(data.email).then(result => {
              this.showFailAlert("Operation reussie", "Un email vous a ete envoye pour reinitialiser votre mot de passe", ['OK']);
            }, error => {
              let error_message = error.message
              console.log(error_message)
              this.showFailAlert("Operation echoue", "Vous n'avez pas de compte sur cette plateforme", ['OK'])
            })
          }
        }
      ]
    });
    prompt.present();
  }

  public toRegister()
  {
    //console.log("to preference")
    this.navCtrl.push(RegisterPage);
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