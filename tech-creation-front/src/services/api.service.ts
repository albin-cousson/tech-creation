import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UtilisateurModel } from '../models/Utilisateur.model';
import { AuthModel } from '../models/Auth';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService {

    auth = new Boolean();
    authSubject = new Subject();
    token: string;
    userId: string;

    constructor(public http: HttpClient) {}

    postSignUpFromServer(utilisateur: UtilisateurModel) {
      return new Promise((resolve, reject)=>{
        this.http
          .post('http://localhost:3000/api/sign-up', utilisateur)
          .subscribe(
            (res: { token: string, userId: string }) => {
              this.auth = true; 
              this.emitAuthSubject();
              this.token = res.token;
              this.userId = res.userId;
              resolve(console.log('Inscription réussi'));
            },
            (error) => {
              this.auth = false;
              this.emitAuthSubject();
              resolve(console.log('Erreur ! : ' + error));
            },
        );
      })
    }

    postSignInFromServer(auth: AuthModel) {
      return new Promise((resolve, reject)=>{
        this.http
        .post('http://localhost:3000/api/sign-in', auth)
        .subscribe(
          (res: { token: string, userId: string }) => {
            this.auth = true; 
            this.emitAuthSubject();
            this.token = res.token;
            this.userId = res.userId;
            resolve(console.log('Connexion réussi'));
          },
          (error) => {
            this.auth = false;
            this.emitAuthSubject();
            resolve(console.log('Erreur ! : ' + error));
          },
        )
      })
    }

    signOut() {
      this.auth = false;
      this.emitAuthSubject();
      this.userId = null;
      this.token = null;
    }

    emitAuthSubject() { 
      this.authSubject.next(this.auth);
    }
} 