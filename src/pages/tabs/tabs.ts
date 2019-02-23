import { CreateOfferPage } from './../create-offer/create-offer';
import { NavParams } from 'ionic-angular';
import { SearchPage } from './../search/search';
import { ProfilePage } from './../profile/profile';
import { OfferPage } from './../offer/offer';
import { PaymentPage } from './../payment/payment';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AnonymousSubject } from 'rxjs/Subject';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = OfferPage;
  tab4Root = PaymentPage
  tab5Root = ProfilePage

  param:any

  constructor(public navParams: NavParams) {

    console.log(this.navParams)

    this.param = {
      user_id: this.navParams.get("id"),
      type: this.navParams.get("type")
    }

    console.log("param is ", this.param)

  }
}
