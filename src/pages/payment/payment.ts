import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js'

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  vendeur:boolean = false;
  commercant:boolean = false;
  user_id:any;
  user_type:any;
  paiement:any;
  loading:any;
  win:any;
  done:any;
  todo:any;
  toget:any;

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
    this.user_id = navParams.data.id 
    this.user_type = navParams.data.type 

    if (this.user_type == "Vendeur")
    {
      this.vendeur = true;
      this.commercant = false
    }
    else{
      this.vendeur = false;
      this.commercant = true;
    }
  }

  ionViewDidEnter()
  {
    this.load() 
  }

  public createGraph()
  {
    let t = this.win + this.done + this.todo + this.toget;
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'pie',
      data: {
        datasets: [{
          label: "Statistiques",
          data: [this.win / t, this.done / t, this.todo / t, this.toget / t],
          backgroundColor: [
            'rgba(100, 100, 255, 1)',
            'rgba(100, 255, 100, 1)',
            'rgba(255, 100, 100, 1)',
            'rgba(100, 255, 255, 1)'
          ]
        }]
      }
    })
  }

  public load(){

    this.showLoading("Please wait")
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = new FormData()
    postData.append('id', this.user_id)

    console.log("Send method post:")

    this.http.post("http://127.0.0.1/Relation/getPaiements.php", postData).subscribe(data => {
      console.log("There is data:")
      console.log(data); 

      if (data['error'] == "")
      {
        this.win = data['win'];
        this.done = data['done'];
        this.todo = data['todo'];
        this.toget = data['toget'];
        this.createGraph();
        this.paiement = data['paiement']
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

  public retirer()
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
