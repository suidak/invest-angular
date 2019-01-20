import { Component, OnInit } from "@angular/core";
import { EmissionService } from "../../_services/emission.service";
import { Router } from "@angular/router";
import { UserService } from "../../_services/user.service";
import * as moment from "moment"
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-list-emissions",
  templateUrl: "./list-emissions.component.html",
  styleUrls: ["./list-emissions.component.scss"],
  providers: [UserService]
})
export class ListEmissionsComponent implements OnInit {

  env : any = environment.apiUrl
  listEmission: any;
  isLoading = false;
  user : any ;
  sortBySociet = false ;
  sortByMontant = false ;
  sortBySousc = false ;
  sortByStat = true;
  sortByDate = false;
  date_maturite : any = moment();
  constructor(private _router: Router,private _emissinService: EmissionService , private _userService : UserService) {
    this.user = this._userService.getUser();
  this.reloadData();
  }

  ngOnInit() {}

  reloadData() {
    this.isLoading = true;
    this._emissinService.publicEmissions().subscribe(data => {
      this.listEmission = data;
      this.listEmission.forEach(element => {
        element.emprunt.dateJouissance = moment(element.emprunt.dateJouissance).add(element.emprunt.maturite, 'years').format("DD-MM-YYYY")
        element.docs.forEach(el => {
          if(el.doc_type==='logo')
            element.logo = el.new_name
        });
      });
      console.log(this.listEmission)
      this.isLoading = false;
    });
  }

  navigateTodetail(id){
    this._router.navigate(['/app/emissions/detail/'+id]);
  }

  sortBySociete(){
    this.isLoading = true;
    this._emissinService.sortBySociete(this.sortBySociet).subscribe(data=>{
      this.listEmission = data ;
      this.sortBySociet = !this.sortBySociet ;
      this.listEmission.forEach(element => {
        element.emprunt.dateJouissance = moment(element.emprunt.dateJouissance).add(element.emprunt.maturite, 'years').format("DD-MM-YYYY")
        element.docs.forEach(el => {
          if(el.doc_type==='logo')
            element.logo = el.new_name
        });
      });
      this.isLoading = false;
    })
  }

  sortByMonatantEmis(){
    this.isLoading = true;
    this._emissinService.sortByMontantEmis(this.sortByMontant).subscribe(data=>{
      this.listEmission = data ;
      this.listEmission.forEach(element => {
        element.emprunt.dateJouissance = moment(element.emprunt.dateJouissance).add(element.emprunt.maturite, 'years').format("DD-MM-YYYY")
        element.docs.forEach(el => {
          if(el.doc_type==='logo')
            element.logo = el.new_name
        });
      });
      this.sortByMontant = !this.sortByMontant ;
      this.isLoading = false;
    })
  }


  sortBySouscrit(){
    this.isLoading = true;
    this._emissinService.sortBySouscrit(this.sortBySousc).subscribe(data=>{
      this.listEmission = data ;
      this.listEmission.forEach(element => {
        element.emprunt.dateJouissance = moment(element.emprunt.dateJouissance).add(element.emprunt.maturite, 'years').format("DD-MM-YYYY")
        element.docs.forEach(el => {
          if(el.doc_type==='logo')
            element.logo = el.new_name
        });
      });
      this.sortBySousc = !this.sortBySousc ;
      this.isLoading = false;
    })
  }

  sortByStatus(){
    this.isLoading = true;
    this._emissinService.sortByStatus(this.sortByStat).subscribe(data=>{
      this.listEmission = data ;
      this.listEmission.forEach(element => {
        element.emprunt.dateJouissance = moment(element.emprunt.dateJouissance).add(element.emprunt.maturite, 'years').format("DD-MM-YYYY")
        element.docs.forEach(el => {
          if(el.doc_type==='logo')
            element.logo = el.new_name
        });
      });
      this.sortByStat = !this.sortByStat ;
      this.isLoading = false;
    })
  }

  sortByDateEcheance(){
    //this.isLoading = true;
    this._emissinService.sortByDateEcheance(this.sortByDate).subscribe(data=>{
      this.listEmission = data ;
      this.listEmission.forEach(element => {
        element.emprunt.dateJouissance = moment(element.emprunt.dateJouissance).add(element.emprunt.maturite, 'years').format("DD-MM-YYYY")
        element.docs.forEach(el => {
          if(el.doc_type==='logo')
            element.logo = el.new_name
        });
      });
      this.sortByDate = !this.sortByDate ;
      //this.isLoading = false;
    })
  }
}
