import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service'
import { Subscription } from 'rxjs/Subscription';
import { SignInPage } from '../sign-in/sign-in';

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})
export class AccueilPage implements OnInit, OnDestroy  {

  _auth = new Boolean(); 
  authSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiService) {
  }

  ngOnInit() {
    this.authSubscription = this.apiService.authSubject.subscribe(
      (res: boolean)=>{
        this._auth = res;          
        if(this._auth == false) {
          this.navCtrl.setRoot(SignInPage);
        }
      }
    )
    this.apiService.emitAuthSubject();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
 