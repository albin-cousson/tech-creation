import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service'
import { AccueilPage } from '../accueil/accueil';
import { UserSpacePage } from '../user-space/user-space';
import { ActuPage } from '../actu/actu'
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  accueilPage = AccueilPage;
  userSpacePage = UserSpacePage;
  actuPage = ActuPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiService) {
  }

}
