import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ActuModel } from '../models/actu.model'; 
import { Subscription } from 'rxjs';  
  
@Component({
  selector: 'app-actu',  
  templateUrl: './actu.component.html', 
  styleUrls: ['./actu.component.scss']  
})
export class ActuComponent implements OnInit, OnDestroy {

  actu: MatTableDataSource<any>;
  actuSubscription: Subscription;
  actuDisplayColumns: string[] = ['nomDuRedacteur', 'prenomDuRedacteur', 'imageDuRedacteurUrl', 'dateDeCreation', 'titre', 'imageHeaderUrl', 'textArticle', 'imageArticleUrl', 'like', 'commentaire', 'modifier', 'supprimer'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  addActuFormGroup: FormGroup;  
  putActuFormGroup: FormGroup;  

  putActuFormImageArticleGroup = new FormGroup({
    image: new FormControl()
  });
  @ViewChild('textBlockElement ', { static: false }) textBlockElement : ElementRef;
  imageArticle: string;
  imageArticelSubscription: Subscription;

  imagePreviewAddActu: string; 
  imagePreviewAddActuForImageDuRedacteurUrl: string;
  imagePreviewPutActu: string;
  imagePreviewPutActuForImageDuRedacteurUrl: string;

  addActu=false;
  putActu=false;

  actuForPut = { 
    _id: "",
    nomDuRedacteur: "", 
    prenomDuRedacteur: "",
    imageDuRedacteurUrl: "",
    dateDeCreation: "", 
    titre: "", 
    imageHeaderUrl: "", 
    textArticle: "", 
    imageArticleUrl: "",
    like: "",
    commentaire: "" 
  };

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
    this.apiService.getActuFromServer();
    this.actuSubscription = this.apiService.actuSubject.subscribe(
      (res: any)=>{
        this.actu = new MatTableDataSource(res);
        this.actu.paginator = this.paginator;
      } 
    )
    this.apiService.emitActuSubject(); 
    this.imageArticelSubscription = this.apiService.imageArticleSubject.subscribe(
      (res: string)=>{
        this.imageArticle = res;
      }
    )
    this.apiService.emitImageArticleSubject();
    this.buildAddActuFormGroup();
    this.buildPutActuFormGroup();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.actu.filter = filterValue.trim().toLowerCase();

    if (this.actu.paginator) {
      this.actu.paginator.firstPage();
    }
  }

  buildAddActuFormGroup() {
    this.addActuFormGroup = this.formBuilder.group({
      nomDuRedacteur: ['', Validators.required],
      prenomDuRedacteur: ['', Validators.required],
      imageDuRedacteurUrl: [null, Validators.required],
      dateDeCreation: ['', Validators.required],
      titre: ['', Validators.required],
      imageHeaderUrl: [null, Validators.required],
      textArticle: ['', Validators.required],
      imageArticleUrl: ['', Validators.required] ,
      like: ['', Validators.required],
      commentaire: ['', Validators.required],
    }) 
  }
 
  buildPutActuFormGroup() {
    this.putActuFormGroup = this.formBuilder.group({
      nomDuRedacteur: ['', Validators.required],
      prenomDuRedacteur: ['', Validators.required],
      imageDuRedacteurUrl: [null, Validators.required],
      dateDeCreation: ['', Validators.required],
      titre: ['', Validators.required],
      imageHeaderUrl: [null, Validators.required],
      textArticle: ['', Validators.required],
      imageArticleUrl: ['', Validators.required] ,
      like: ['', Validators.required],
      commentaire: ['', Validators.required],
    }) 
  }

  buildPutActuImageArticleFormGroup() {
    this.putActuFormImageArticleGroup = this.formBuilder.group({
      image: [null, Validators.required]
    }) 
  }

  onSubmitaddActuFormGroup() {
    const actu: ActuModel = { 
      nomDuRedacteur: this.addActuFormGroup.get('nomDuRedacteur').value,
      prenomDuRedacteur: this.addActuFormGroup.get('prenomDuRedacteur').value,
      imageDuRedacteurUrl: '',
      dateDeCreation: this.addActuFormGroup.get('dateDeCreation').value,
      titre: this.addActuFormGroup.get('titre').value, 
      imageHeaderUrl: '',
      textArticle: this.addActuFormGroup.get('textArticle').value,
      imageArticleUrl: '',
      like: "",
      commentaire: [] 
    }   
    this.apiService.postActuFromServer(actu, this.addActuFormGroup.get('imageDuRedacteurUrl').value, this.addActuFormGroup.get('imageHeaderUrl').value).then(
      ()=>{
        this.addActuFormGroup.get('imageDuRedacteurUrl').reset();
        this.addActuFormGroup.get('imageHeaderUrl').reset();
      }
    );
  }

  onImagePickAddActuForImageDuRedacteurUrl(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addActuFormGroup.get('imageDuRedacteurUrl').patchValue(file);
    this.addActuFormGroup.get('imageDuRedacteurUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.addActuFormGroup.get('imageDuRedacteurUrl').valid) {
        this.imagePreviewAddActuForImageDuRedacteurUrl = reader.result as string;
      } else {
        this.imagePreviewAddActuForImageDuRedacteurUrl = null;
      }
    };
    reader.readAsDataURL(file);
  } 
 
  onImagePickAddActu(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addActuFormGroup.get('imageHeaderUrl').patchValue(file);
    this.addActuFormGroup.get('imageHeaderUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.addActuFormGroup.get('imageHeaderUrl').valid) {
        this.imagePreviewAddActu = reader.result as string;
      } else {
        this.imagePreviewAddActu = null;
      }
    };
    reader.readAsDataURL(file);
  } 
     
  onSubmitPutActuFormGroup() {
    const actu: ActuModel = {  
      nomDuRedacteur: this.putActuFormGroup.get('nomDuRedacteur').value,
      prenomDuRedacteur: this.putActuFormGroup.get('prenomDuRedacteur').value,
      imageDuRedacteurUrl: '',
      dateDeCreation: this.putActuFormGroup.get('dateDeCreation').value,
      titre: this.putActuFormGroup.get('titre').value,
      imageHeaderUrl: '',
      textArticle: this.putActuFormGroup.get('textArticle').value,
      imageArticleUrl: '',
      like: "",
      commentaire: [] 
    } 
    this.apiService.putActuFromServer(this.actuForPut._id, actu, this.putActuFormGroup.get('imageDuRedacteurUrl').value, this.putActuFormGroup.get('imageHeaderUrl').value).then(()=>{
      this.putActuFormGroup.get('imageDuRedacteurUrl').reset();
      this.putActuFormGroup.get('imageHeaderUrl').reset();
    }) 
  }

  onImagePickPutActuForImageDuRedacteurUrl(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.putActuFormGroup.get('imageDuRedacteurUrl').patchValue(file);
    this.putActuFormGroup.get('imageDuRedacteurUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.putActuFormGroup.get('imageDuRedacteurUrl').valid) {
        this.imagePreviewPutActuForImageDuRedacteurUrl = reader.result as string;
      } else {
        this.imagePreviewPutActuForImageDuRedacteurUrl = null;
      }
    };
    reader.readAsDataURL(file);
  } 

  onImagePickPutActu(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.putActuFormGroup.get('imageHeaderUrl').patchValue(file);
    this.putActuFormGroup.get('imageHeaderUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.putActuFormGroup.get('imageHeaderUrl').valid) { 
        this.imagePreviewPutActu = reader.result as string;
      } else {
        this.imagePreviewPutActu = null; 
      } 
    };  
    reader.readAsDataURL(file);
  }
 
  onImagePickPutImageArticleActu(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.putActuFormImageArticleGroup.get('imageHeaderUrl').patchValue(file);
    this.putActuFormImageArticleGroup.get('imageHeaderUrl').updateValueAndValidity();
    this.apiService.postActuImageArticleFromServer(this.putActuFormImageArticleGroup.get('imageHeaderUrl').value).then(
      ()=>{
        var input = document.querySelector("textarea");
        var startPos = input.selectionStart;
        var endPos = input.selectionEnd;
        new Promise((resolve, reject)=>{
          resolve(input.value = input.value.substring(0, startPos) + '</p> <img src="'+this.imageArticle+'" alt="" /> <p>' + input.value.substring(endPos, input.value.length));
        }).then(()=>{
          input.focus();
          var keyboardEvent = document.createEvent('KeyboardEvent');
          var ev = new Event('input');
          input.value = input.value + '';
          input.dispatchEvent(ev);
        })
      }
    );
  }

  actuForPutFnct(actu_id, actuNomDuRedacteur, actuPrenomDuRedacteur, actuImageDuRedacteurUrl, actuDateDeCreation, actuTitre, actuImageHeaderUrl, actuTextArticle, actuImageArticleUrl, actuLike, actuCommentaire) {
    this.actuForPut._id = actu_id;
    this.actuForPut.nomDuRedacteur = actuNomDuRedacteur;
    this.actuForPut.prenomDuRedacteur = actuPrenomDuRedacteur; 
    this.imagePreviewPutActuForImageDuRedacteurUrl = actuImageDuRedacteurUrl; 
    this.actuForPut.dateDeCreation = actuDateDeCreation;
    this.actuForPut.titre = actuTitre;
    this.imagePreviewPutActu = actuImageHeaderUrl;
    this.actuForPut.textArticle = actuTextArticle;
    this.actuForPut.imageArticleUrl = actuImageArticleUrl;
    this.actuForPut.like = actuLike;
    this.actuForPut.commentaire = actuCommentaire;
  } 
  
  deleteActuFromServer(actu_id) {
    this.apiService.deleteActuFromServer(actu_id); 
  }

  ngOnDestroy() {
    this.actuSubscription.unsubscribe();
    this.imageArticelSubscription.unsubscribe();
  }

}
