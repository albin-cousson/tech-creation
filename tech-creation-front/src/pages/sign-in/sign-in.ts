import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service'
import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../sign-up/sign-up'
import { AuthModel } from '../../models/Auth'
import { Subscription } from 'rxjs/Subscription';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage implements OnInit, OnDestroy {

  signInForm: FormGroup;
  auth: AuthModel;
  _auth = new Boolean(); 
  authSubscription: Subscription;
  signUpPage = SignUpPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private apiService: ApiService, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.signInFormBuilder();
    this.authSubscription = this.apiService.authSubject.subscribe(
      (res: boolean)=>{
        this._auth = res;    
      }
    )
    this.apiService.emitAuthSubject();
  }
   
  //Création du formulaire
  signInFormBuilder() {
    this.signInForm = this.formBuilder.group({
      identifiant: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  
  //Soumission du formulaire
  async onSubmitSignInForm() {
    const identifiant = this.signInForm.get('identifiant').value;
    const password = this.signInForm.get('password').value;
    this.auth = {
      identifiant: identifiant,
      password: password,
    }
    this.apiService.postSignInFromServer(this.auth)
    .then(()=>{
      if(this._auth == true){
        this.navCtrl.setRoot(TabsPage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Identifiant ou mot de passe érroné',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }
    })
  } 

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

};
  