import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class EmissionService {
  constructor(private http: Http) {}
  getRaison(raison) {
    if (raison) {
      return this.http
        .get(environment.apiUrl + "societes/" + raison)
        .map((response: Response) => response.json());
    }
  }

  setInformation(data) {
    return this.http
      .post(environment.apiUrl + "societes/", data)
      .map((response: Response) => response.json());
  }

  saveEmission(data) {
    return this.http
      .post(environment.apiUrl + "emissions/", data)
      .map((response: Response) => response.json());
  }

  updateEmissionSociete(data, id) {
    return this.http
      .post(environment.apiUrl + "emissions/updateEmissionSociete/" + id, data)
      .map((response: Response) => response.json());
  }

  updateEmissionEmprunt(data, id) {
    return this.http
      .post(environment.apiUrl + "emissions/updateEmissionEmprunt/" + id, data)
      .map((response: Response) => response.json());
  }

  updateEmissionFinal(data, id) {
    return this.http
      .post(environment.apiUrl + "emissions/updateEmissionFinal/" + id, data)
      .map((response: Response) => response.json());
  }

  //all Emissions
  publicEmissions() {
    return this.http
      .get(environment.apiUrl + "emissions/public")
      .map((response: Response) => response.json());
  }

  //emission detail

  emissionDetail(id) {
    return this.http
      .get(environment.apiUrl + "emissions/" + id)
      .map((response: Response) => response.json());
  }

  sendEmail(data) {
    return this.http
      .post(environment.apiUrl + "emissions/sendEmail", data)
      .map((response: Response) => response.json());
  }
  investir(data) {
    return this.http
      .post(environment.apiUrl + "emissions/investir", data)
      .map((response: Response) => response.json());
  }

  // sort by societe 
  sortBySociete(data){
    let sort = {
      sort : data
    }
    return this.http
    .post(environment.apiUrl + "emissions/filerbysociete", sort)
    .map((response: Response) => response.json());
  }
   // sort by MontantEmis 
   sortByMontantEmis(data){
    let sort = {
      sort : data
    }
    return this.http
    .post(environment.apiUrl + "emissions/filterByMontantEmis", sort)
    .map((response: Response) => response.json());
  }

  // sort by souscrit 
  sortBySouscrit(data){
    let sort = {
      sort : data
    }
    return this.http
    .post(environment.apiUrl + "emissions/filterBySouscrit", sort)
    .map((response: Response) => response.json());
  }
  

  sortByStatus(status) {
    return this.http
      .get(environment.apiUrl + "emissions/sort/"+status)
      .map((response: Response) => response.json());
  }

  sortByDateEcheance(type) {
    
    return this.http
      .get(environment.apiUrl + "emissions/filterbydate/"+type)
      .map((response: Response) => response.json());
  }
}
