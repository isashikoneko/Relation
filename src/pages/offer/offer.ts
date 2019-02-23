import { AnnoncePage } from './../annonce/annonce';
import { CreateOfferPage } from './../create-offer/create-offer';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Title } from '@angular/platform-browser';

/**
 * Generated class for the CreateOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {

  myForm:any
  loading:any
  category:any
  user_id:any
  type:any
  data:any

  @ViewChild('title')title:ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public http: HttpClient, public alertCtrl: AlertController) {
    //this.user_id = this.navParams.get("id")
    this.user_id = this.navParams.data.user_id
    this.type = this.navParams.data.type
    console.log(this.user_id)
    this.myForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      price: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      prime: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.data = navParams.get('data');

    this.loadCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
    console.log(this.data)

    if (!(typeof this.data === 'undefined'))
    {
      console.log("editing");
      this.title.nativeElement.value = "Modifier annonce";
      this.myForm.value.title = this.data.title;
      this.myForm.value.price = this.data.price;
      this.myForm.value.prime = this.data.prime;
      this.myForm.value.category = this.data.category;
      this.myForm.value.quantity = this.data.quantity;
      this.myForm.value.description = this.data.description;
    }
  }

  public loadCategory(){

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
        this.category = data['category'] 
        this.hideLoading()
      }
      else
      {
        this.hideLoading()
        this.showFailAlert("Category cannot be loaded", data['error'], ['OK'])
      }
      
    }, error => {
      console.log(error);
      this.hideLoading()
      this.showFailAlert("Category loading failed", "Cannot reach server", ['OK'])
    });

  }

  public create(){
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    console.log(this.type)

    if (typeof this.data === 'undefined')
    {

      if (this.type != 1)
      {
        let postData = new FormData()
        postData.append('id', this.user_id)
        postData.append('title', this.myForm.value.title) 
        postData.append('price', this.myForm.value.price)
        postData.append('prime', this.myForm.value.prime)
        postData.append('category', this.myForm.value.category)
        postData.append('quantity', this.myForm.value.quantity)
        postData.append('description', this.myForm.value.description)
        postData.append('photo', "");

        this.navCtrl.push(CreateOfferPage, {data: postData, prime: this.myForm.value.prime});
      }
      else
      {
        this.showFailAlert("You are a seller", "Sellers cannot create ad", ['OK']);
      }

    }
    else{

      let postData = new FormData()
      postData.append('id', this.data.id)
      postData.append('title', this.myForm.value.title)
      postData.append('price', this.myForm.value.price)
      postData.append('prime', this.myForm.value.prime)
      postData.append('category', this.myForm.value.category)
      postData.append('quantity', this.myForm.value.quantity)
      postData.append('description', this.myForm.value.description)
      postData.append('userid', this.user_id)

      console.log("Send method post:")

      this.http.post("http://127.0.0.1/Relation/editAds.php", postData).subscribe(data => {
        console.log("There is data:")
        console.log(data);

        if (data['error'] == "")
        {
          this.navCtrl.push(AnnoncePage, {ad: data['annonce'], id: this.user_id});
          this.hideLoading()
        }
        else
        {
          this.hideLoading()
          this.showFailAlert("Editing failed", data['error'], ['OK'])
        }
        
      }, error => {
        console.log(error);
        this.hideLoading()
        this.showFailAlert("Editing failed", "Cannot reach server", ['OK'])
      });

    }

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
