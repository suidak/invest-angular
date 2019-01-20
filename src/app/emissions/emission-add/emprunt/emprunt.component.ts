import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';



@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: ['./emprunt.component.scss']
})
export class EmpruntComponent implements OnInit {
  value1 = 20;
  value2 = 10;
  rangeValue;
  checkboxtf: boolean=false;
  checkboxtv: boolean=false;
  tfValue =7;
  tvValue =7;

  emprunt: any = {}
  id: any;

    //Advance Date Option - Disable Dates
  //All Future Dates
  _startDate = null;
  _endDate = null;
  _advance_date = null;
  _advance_disabledDate(current: Date): boolean {
    //Future
    return current && current.getTime() < Date.now();
  }

  _startValueChange = () => {
    this.emprunt.dateCloture = moment(this._startDate).format("YYYY-MM-DD")
    this.updateEmission.emit(this.emprunt)
    console.log(this.emprunt)
    if (this._startDate > this._endDate) {
      this._endDate = null;
    }
    
  };
  _endValueChange = () => {
    this.emprunt.dateJouissance = moment(this._endDate).format("YYYY-MM-DD")
    this.updateEmission.emit(this.emprunt)
    console.log(this.emprunt)
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
  };

  @Input() set getEmissionId(value) {
    this.id = value
  }

  @Output() updateEmission = new EventEmitter();

  constructor() {
    this.emprunt = {
      nom: "",
      montant: 50,
      maturite: 10,
      modalite: "amorti",
      frequence: "trim",
      dateJouissance: null,
      dateCloture: null,
      rating:''
      /*taux_fixe: 7,
      taux_variable: 7*/
    }
  }

  ngOnInit() {
    this.updateEmission.emit(this.emprunt);
  }
  marks: any = {
    0: '0M TND',
    25: '25M TND',
    50: '50M TND',
    75: '75M TND',
    100: '100M TND'
  };
  marks1: any = {
    0: '0 A',
    5: '5 A',
    10: '10 A',
    15: '15 A',
    20: '20 A'
  };

  incerementTF() {
    if (this.tfValue < 100){
      this.tfValue = this.tfValue + 0.01
      this.emprunt.taux_fixe = this.tfValue
      this.updateEmission.emit(this.emprunt)
    }
  }
  decrementTF() {
    if (this.tfValue > 0){
      this.tfValue = this.tfValue - 0.01
      this.emprunt.taux_fixe = this.tfValue
      this.updateEmission.emit(this.emprunt)
    }
  }

  incerementTV() {
    if (this.tvValue < 100){
      this.tvValue = this.tvValue + 0.01
      this.emprunt.taux_variable = this.tvValue
      this.updateEmission.emit(this.emprunt)
    }
  }
  decrementTV() {
    if (this.tvValue > 0){
      this.tvValue = this.tvValue - 0.01
      this.emprunt.taux_variable = this.tvValue
      this.updateEmission.emit(this.emprunt)
    }
  }

  getMontant(data) {
    this.emprunt.montant = data
    this.updateEmission.emit(this.emprunt)
  }

  getMaturite(data) {
    this.emprunt.maturite = data
    this.updateEmission.emit(this.emprunt)
  }

  emitEmprunt() {
    this.updateEmission.emit(this.emprunt)

  }

  checkTF(){
    this.checkboxtf = !this.checkboxtf
    this.emprunt.taux_fixe = this.tfValue
    if(!this.checkboxtf){
      delete this.emprunt.taux_fixe;
      console.log(this.emprunt)
      this.updateEmission.emit(this.emprunt)
    }else{
      this.emprunt.taux_fixe = this.tfValue
      console.log(this.emprunt)
      this.updateEmission.emit(this.emprunt)
    }

  }

  checkTV(){
    this.checkboxtv = !this.checkboxtv
    this.emprunt.taux_variable = this.tvValue
    if(!this.checkboxtv){
      delete this.emprunt.taux_variable;
      //console.log(this.emprunt)
      this.updateEmission.emit(this.emprunt)
    }else{
      this.emprunt.taux_variable = this.tvValue
      //console.log(this.emprunt)
      this.updateEmission.emit(this.emprunt)
    }

  }

  onRatingChange(data){
    this.emprunt.rating = data
    //console.log(this.emprunt.rating)
    this.updateEmission.emit(this.emprunt)
  }

  onNameChange(data){
    this.emprunt.emprunt_name = data
    this.updateEmission.emit(this.emprunt)
  }
}
