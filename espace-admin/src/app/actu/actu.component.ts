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
  actuDisplayColumns: string[] = ['nom', 'prenom', 'date', 'article', 'like', 'commentaire', 'modifier', 'supprimer'];
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
  imagePreviewPutActu: string;

  addActu=false;
  putActu=false;

  actuForPut = { 
    _id: "",
    nomDuRedacteur: "", 
    prenomDuRedacteur: "",
    dateDeCreation: "", 
    text: "",
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
      dateDeCreation: ['', Validators.required],
      image: [null, Validators.required],
      text: ['', Validators.required] 
    }) 
  }
 
  buildPutActuFormGroup() {
    this.putActuFormGroup = this.formBuilder.group({
      nomDuRedacteur: ['', Validators.required], 
      prenomDuRedacteur: ['', Validators.required],
      dateDeCreation: ['', Validators.required],
      image: [null, Validators.required],
      text: ['', Validators.required] 
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
      dateDeCreation: this.addActuFormGroup.get('dateDeCreation').value,
      imageUrl: '',
      text: this.addActuFormGroup.get('text').value,
      like: "",
      commentaire: [] 
    }   
    this.apiService.postActuFromServer(actu, this.addActuFormGroup.get('image').value).then(
      ()=>{
        this.addActuFormGroup.get('image').reset();
      }
    );
  }
 
  onImagePickAddActu(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addActuFormGroup.get('image').patchValue(file);
    this.addActuFormGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.addActuFormGroup.get('image').valid) {
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
      dateDeCreation: this.putActuFormGroup.get('dateDeCreation').value, 
      imageUrl: '',
      text: this.putActuFormGroup.get('text').value,
      like: "",
      commentaire: [] 
    } 
    console.log(this.putActuFormGroup.get('image').value);
    
    this.apiService.putActuFromServer(this.actuForPut._id, actu, this.putActuFormGroup.get('image').value) 
  }

  onImagePickPutActu(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.putActuFormGroup.get('image').patchValue(file);
    this.putActuFormGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.putActuFormGroup.get('image').valid) {
        this.imagePreviewPutActu = reader.result as string;
      } else {
        this.imagePreviewPutActu = null;
      } 
    }; 
    reader.readAsDataURL(file);
  }
 
  onImagePickPutImageArticleActu(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.putActuFormImageArticleGroup.get('image').patchValue(file);
    this.putActuFormImageArticleGroup.get('image').updateValueAndValidity();
    this.apiService.postActuImageArticleFromServer(this.putActuFormImageArticleGroup.get('image').value).then(
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

  actuForPutFnct(actu_id, actuNomDuRedacteur, actuPrenomDuRedacteur, actuDateDeCreation, actuImageUrl, actuText) {
    this.actuForPut._id = actu_id;
    this.actuForPut.nomDuRedacteur = actuNomDuRedacteur;
    this.actuForPut.prenomDuRedacteur = actuPrenomDuRedacteur; 
    this.actuForPut.dateDeCreation = actuDateDeCreation;
    this.imagePreviewPutActu = actuImageUrl;
    this.actuForPut.text = actuText;
  } 
 
  deleteActuFromServer(actu_id) {
    this.apiService.deleteActuFromServer(actu_id); 
  }

  ngOnDestroy() {
    this.actuSubscription.unsubscribe();
    this.imageArticelSubscription.unsubscribe();
  }

}
