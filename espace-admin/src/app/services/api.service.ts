import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActuModel } from '../models/actu.model';
import { Subject } from 'rxjs';
 
@Injectable({ 
  providedIn: 'root'
})  
export class ApiService {

  ip = "http://localhost:3000";
  
  actu = new Array();
  actuSubject = new Subject();

  imageArticle = new String();
  imageArticleSubject = new Subject();

  constructor(private httpClient: HttpClient) { }

  getActuFromServer() {
    const tokenDeTest = null;
    return new Promise((resolve, reject)=>{
      this.httpClient
        .post(this.ip+'/api/actu/read', tokenDeTest)
        .subscribe(
          (res: any) => {
            this.actu = res;
            this.emitActuSubject();
            resolve(console.log('Inscription réussi'));
          },
          (error) => {
            resolve(console.log('Erreur ! : ' + error));
          },
      );
    })
  }

  postActuFromServer(actu: ActuModel, imageDuRedacteurUrl: File, imageHeaderUrl: File) { 
    return new Promise((resolve, reject)=>{
      const actugData = new FormData();
      actugData.append('actu', JSON.stringify(actu));
      actugData.append('image', imageDuRedacteurUrl);
      actugData.append('image', imageHeaderUrl);
      this.httpClient
        .post(this.ip+'/api/actu/add', actugData)
        .subscribe(
          () => {
            this.getActuFromServer();
            resolve(console.log('Inscription réussi')); 
          },
          (error) => {
            resolve(console.log('Erreur ! : ' + error));
          },
      );
    })
  }

  postActuImageArticleFromServer(image: File) {
    return new Promise((resolve, reject)=>{
      const actugData = new FormData();
      actugData.append('image', image, 'imgageArticle');
      this.httpClient
        .post(this.ip+'/api/actu/addImageArticle', actugData)
        .subscribe(
          (res) => {
            this.getActuFromServer();
            this.imageArticle = res['imageArticle'];
            this.emitImageArticleSubject();
            resolve(console.log(res['imageArticle']));
          },
          (error) => {
            resolve(console.log('Erreur ! : ' + error));
          },
      );
    })
  }

  putActuFromServer(actu_id, actu: ActuModel, imageDuRedacteurUrl: File, imageHeaderUrl: File) {
    return new Promise((resolve, reject)=>{ 
      const actugData = new FormData();
      let imageDuRedacteur;
      let imageHeader;
      actugData.append('actu', JSON.stringify(actu));
      for(let i=0;i<this.actu.length;i++){
        if(actu_id==this.actu[i]._id){
          imageDuRedacteur = this.actu[i].imageDuRedacteurUrl 
          imageHeader = this.actu[i].imageHeaderUrl;
        }
      }  
      if(imageDuRedacteurUrl!=null) {
        actugData.append('image', imageDuRedacteurUrl);
      } else {
        actugData.append('imageDuRedacteurUrl', imageDuRedacteur)
      }
      if(imageHeaderUrl!=null) {
        actugData.append('image', imageHeaderUrl);
      } else { 
        actugData.append('imageHeaderUrl', imageHeader)
      }
      this.httpClient
        .put(this.ip+'/api/actu/put/' + actu_id, actugData)
        .subscribe(
          (res) => {
            this.getActuFromServer();
            resolve(console.log('Inscription réussi'));
          },
          (error) => {
            resolve(console.log('Erreur ! : ' + error));
          },
      );
    })
  }

  deleteActuFromServer(actu_id) {
    return new Promise((resolve, reject)=>{ 
      this.httpClient
        .delete(this.ip+'/api/actu/delete/' + actu_id)
        .subscribe(
          (res) => {
            this.getActuFromServer();
            resolve(console.log('Inscription réussi'));
          },
          (error) => {
            resolve(console.log('Erreur ! : ' + error));
          },
      );
    })
  }

  emitActuSubject() {
    this.actuSubject.next(this.actu);
  }

  emitImageArticleSubject() {
    this.imageArticleSubject.next(this.imageArticle);
  }
}
