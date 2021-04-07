import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { ApiService } from '../../services/api.service'
import { Subscription } from 'rxjs/Subscription';
import { SignInPage } from '../sign-in/sign-in';
import { EpargneModel } from '../../models/Epargne.model';

@IonicPage()
@Component({
  selector: 'page-user-space',
  templateUrl: 'user-space.html',
}) 
export class UserSpacePage implements OnInit, OnDestroy {

  _auth = new Boolean(); 
  authSubscription: Subscription; 
  tokenAndUserId = {
    token: this.apiService.token,
    userId: this.apiService.userId
  };
  user = new Array(); 
  userSubscription: Subscription;
  epargne = new Array(); 
  epargneSubscription: Subscription;
  serveurMining = new Array(); 
  serveurMiningSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiService) {}

  token = this.apiService.token;
  userId = this.apiService.userId;

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

    //Récupération du user
    this.apiService.getUserFromServer(this.tokenAndUserId);
    this.userSubscription = this.apiService.userSubject.subscribe(
      (res: any)=>{
        this.user = res
        console.log(this.user);
      }
    )
    this.apiService.emitUserSubject();
 
    //Récuparation des comptes epargnes
    this.apiService.getEpargneFromServer(this.tokenAndUserId);
    this.epargneSubscription = this.apiService.epargneSubject.subscribe(
      (res: any)=>{
        this.epargne = res;
      }
    )   
    this.apiService.emitEpargneSubject();   
   
    //Récuperation des serveur mining 
    this.apiService.getServeurMiningFromServer(this.tokenAndUserId);
    this.serveurMiningSubscription = this.apiService.serveurMiningSubject.subscribe(
      (res: any)=>{
        this.serveurMining = res;
      }  
    )
    this.apiService.emitServeurMiningSubject();
  }
 
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.epargneSubscription.unsubscribe();
    this.serveurMiningSubscription.unsubscribe();
  }

}
 