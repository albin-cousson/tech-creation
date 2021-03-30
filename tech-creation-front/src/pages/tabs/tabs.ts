import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { UserSpacePage } from '../user-space/user-space';
import { ActuPage } from '../actu/actu'

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  accueilPage = AccueilPage;
  userSpacePage = UserSpacePage;
  actuPage = ActuPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
