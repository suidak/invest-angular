import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { EmissionService } from '../../_services/emission.service';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-emission-add',
  templateUrl: './emission-add.component.html',
  styleUrls: ['./emission-add.component.scss']
})
export class EmissionAddComponent implements OnInit {

  disabledTabs = {
    EMPRUNT: true,
    DOCUMENTS: true,
    CONTRAT: true,
    QUESTIONS: true,
    EMETEUR: true

  }

  model: any = {}
  actionId = "add";
  //Current Tab Index
  selectedStep = 0;

  finishState = false;

  constructor(private fb: FormBuilder, 
    private _serviceEmission: EmissionService,
    private router:Router) {
  }

  ngOnInit() {
  }

  navigateToEmprunt(data) {
    //validate here then
    if (data) {
      this.disabledTabs.EMPRUNT = false;
      this.selectedStep = 1;
      this.model.societe_id = data;
      if (!this.model._id) {
        this._serviceEmission.saveEmission(this.model).subscribe(d => {
          this.model._id = d._id;
        })
      } else {

        this._serviceEmission.updateEmissionSociete({ societe_id: this.model.societe_id }, this.model._id).subscribe(dd => {
          console.log(dd);
        })


      }
    }
  }


  navigateToDocuments() {
    if((this.model.emprunt.dateCloture && this.model.emprunt.dateJouissance) && this.model.emprunt.emprunt_name)
    {
      this.disabledTabs.DOCUMENTS = false;
      this.selectedStep = 2;
    }
    else{
      document.documentElement.scrollTop = 0;
    }
   
  }

  navigateToContrat() {

    this.disabledTabs.CONTRAT = false;
    this.selectedStep = 3;

  }

  navigateToQuestions() {
    //validate here then
    //if(!this.billingForm.invalid){
    this.disabledTabs.QUESTIONS = false;
    this.selectedStep = 4;
    //	}
    //	else{
    //	this.billingForm
    //	}
  }
  navigateToEmeteur() {

    this.disabledTabs.EMETEUR = false;
    this.selectedStep = 5;

  }

  finish(data) {
    this.model.ispublic = data.model.st;
    this.finishState = data.finished;
    let representant = {
      nom: data.model.nom,
      prenom: data.model.prenom,
      societe: data.model.societe,
      tel: data.model.tel,
      site: data.model.site,
      email: data.model.email,
    }
    this.model.representant = representant ;
    //add emetteur_id from connected user
    this.model.emetteur_id = JSON.parse(localStorage.getItem('user'))._id

  }


  //Prev
  prevTab() {
    if (this.selectedStep > 0)
      this.selectedStep--;
  }
  //Next
  nextTab() {
    this.selectedStep++;
  }

  updateEmission(emprunt){
    this.model.emprunt = emprunt
    this.model.emprunt.dateEcheance = moment(this.model.emprunt.dateJouissance).add(this.model.emprunt.maturite, 'years').format("DD-MM-YYYY")
  }
  updateEmissionQuestions(msg){
    this.model.question = msg
  }

  isFinished(){
    
    this._serviceEmission.updateEmissionFinal(this.model, this.model._id).subscribe(dd => {
      this.router.navigate(['/app/emissions/detail/'+this.model._id])
    })
   
  }

}
