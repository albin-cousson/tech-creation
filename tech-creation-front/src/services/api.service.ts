import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UtilisateurModel } from '../models/Utilisateur.model';
import { AuthModel } from '../models/Auth.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService {

    ip = "http://localhost:3000";

    auth = new Boolean();
    authSubject = new Subject();
    user = new Array();
    userSubject = new Subject();
    epargne = new Array();
    epargneSubject = new Subject();
    serveurMining = new Array();
    serveurMiningSubject = new Subject();
    token: string;
    userId: string;

    constructor(public http: HttpClient) {}

    postSignUpFromServer(utilisateur: UtilisateurModel) {
      return new Promise((resolve, reject)=>{
        this.http
          .post(this.ip+'/api/sign-up', utilisateur)
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
        .post(this.ip+'/api/sign-in', auth)
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

    getUserFromServer(tokenAndUserId) {
      return new Promise((resolve, reject)=>{
        this.http
        .post(this.ip+'/api/souscription/user', tokenAndUserId)
        .subscribe(
          (res: any) => {
            this.user = res;
            this.emitUserSubject();
            resolve(console.log('Connexion réussi'));
          },
          (error) => {
            resolve(console.log('Erreur ! : ' + error)); 
          },
        )
      })
    }

    getEpargneFromServer(tokenAndUserId) {
      return new Promise((resolve, reject)=>{
        this.http
        .post(this.ip+'/api/souscription/epargne', tokenAndUserId)
        .subscribe(
          (res: any) => {
            this.epargne = res;
            this.emitEpargneSubject();
            resolve(console.log('Connexion réussi'));
          },
          (error) => {
            resolve(console.log('Erreur ! : ' + error)); 
          },
        )
      })
    }

    getServeurMiningFromServer(tokenAndUserId) { 
      return new Promise((resolve, reject)=>{
        this.http
        .post(this.ip+'/api/souscription/serveurMining', tokenAndUserId)
        .subscribe(
          (res: any) => {
            this.serveurMining = res;
            this.emitServeurMiningSubject();
            resolve(console.log('Connexion réussi'));
          },
          (error) => { 
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

    emitUserSubject() {
      this.userSubject.next(this.user)
    }

    emitEpargneSubject() {
      this.epargneSubject.next(this.epargne);
    }

    emitServeurMiningSubject() {
      this.serveurMiningSubject.next(this.serveurMining);
    }
} 