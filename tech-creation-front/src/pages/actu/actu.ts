import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service'
import { Subscription } from 'rxjs/Subscription';
import { SignInPage } from '../sign-in/sign-in';

/**
 * Generated class for the ActuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actu',
  templateUrl: 'actu.html',
})
export class ActuPage implements OnInit, OnDestroy {

  _auth = new Boolean(); 
  authSubscription: Subscription;
  tokenAndUserId = {
    token: this.apiService.token,
    userId: this.apiService.userId
  };
  actu = new Array();
  actuSubscription: Subscription;

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
    this.apiService.getActuFromServer(this.tokenAndUserId)
    this.actuSubscription = this.apiService.actuSubject.subscribe((res:any)=>{
      this.actu = res;
      console.log(this.actu)
    })
    this.apiService.emitActuSubject();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
