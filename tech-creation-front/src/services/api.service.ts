import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http'
import { UtilisateurModel } from '../models/Utilisateur.model';
import { AuthModel } from '../models/Auth';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService {

    auth = new Boolean();
    authSubject = new Subject();

    constructor(public http: HttpClient) {}

    postSignUpFromServer(utilisateur: UtilisateurModel) {
      this.http
        .post('http://localhost:3000/api/sign-up', utilisateur)
        .subscribe(
          () => {
            console.log('Inscription réussi');
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
      );
    }

    postSignInFromServer(auth: AuthModel) {
      this.http
        .post('http://localhost:3000/api/sign-in', auth)
        .subscribe(
          () => {
            this.auth = true; 
            console.log('Connexion réussi');
            this.emitAuthSubject();
          },
          (error) => {
            this.auth = false;
            console.log('Erreur ! : ' + error);
            this.emitAuthSubject();
          }
      );
    }

    emitAuthSubject() {
      this.authSubject.next(this.auth);
    }
} 