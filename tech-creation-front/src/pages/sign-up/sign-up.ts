import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { UtilisateurModel } from '../../models/Utilisateur.model';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage implements OnInit {

  signUpForm: FormGroup;
  signUpModel: UtilisateurModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  ngOnInit() {
    this.signUpFormBuilder();
  }

  signUpFormBuilder() {
    this.signUpForm = this.formBuilder.group({
      identifiant: ['', Validators.required],
      password: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      lieuDeNaissance: ['', Validators.required],
      dateDeNaissance: ['', Validators.required],
      nationalite: ['', Validators.required],
      sexe: ['', Validators.required],
      adresse: ['', Validators.required],
      pays: ['', Validators.required],
      codePostale: ['', Validators.required],
      ville: ['', Validators.required],
      telFixe: ['', Validators.required],
      telMobile: ['', Validators.required],
      email: ['', Validators.required],
      epargne: ['', Validators.required],
      serveurMining: ['', Validators.required],
      carte: ['', Validators.required],
    })
  }

  onSubmitSignUpForm() {
    const identifiant = this.signUpForm.get('identifiant').value;
    const password = this.signUpForm.get('password').value;
    const nom = this.signUpForm.get('nom').value;
    const prenom = this.signUpForm.get('prenom').value;
    const lieuDeNaissance = this.signUpForm.get('lieuDeNaissance').value;
    const dateDeNaissance = this.signUpForm.get('dateDeNaissance').value;
    const nationalite = this.signUpForm.get('nationalite').value;
    const sexe = this.signUpForm.get('sexe').value;
    const adresse = this.signUpForm.get('adresse').value;
    const pays = this.signUpForm.get('pays').value;
    const codePostale = this.signUpForm.get('codePostale').value;
    const ville = this.signUpForm.get('ville').value;
    const telFixe = this.signUpForm.get('telFixe').value;
    const telPortable = this.signUpForm.get('telMobile').value;
    const email = this.signUpForm.get('email').value;
    const epargne = this.signUpForm.get('epargne').value;
    const serveurMining = this.signUpForm.get('serveurMining').value;
    const carte = this.signUpForm.get('carte').value;
    this.signUpModel = {
      identifiant: identifiant,
      password: password,
      nom: nom,
      prenom: prenom,
      lieuDeNaissance: lieuDeNaissance,
      dateDeNaissance: dateDeNaissance,
      nationalite: nationalite,
      sexe: sexe,
      adresse: adresse,
      pays: pays,
      codePostale: codePostale,
      ville: ville,
      telFixe: telFixe,
      telPortable: telPortable,
      email: email,
      souscription: [
        epargne, serveurMining, carte
      ],
    }    
    this.apiService.postSignUpFromServer(this.signUpModel);
    //this.navCtrl.setRoot(TabsPage);
  } 

}
