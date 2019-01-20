import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmissionService } from "../../_services/emission.service";
import { environment } from "../../../environments/environment";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../_services/user.service";
import * as moment from "moment";
import { Observable } from "rxjs";

@Component({
  selector: "app-emission-detail",
  templateUrl: "./emission-detail.component.html",
  styleUrls: ["./emission-detail.component.scss"],
  providers: [UserService]
})
export class EmissionDetailComponent implements OnInit {
  rows: any[] = [];
  env: any = environment.apiUrl;
  remainingTime: any;
  date_maturite: any = moment();
  isLoading = false;
  disabled = false;
  msg = false;
  user: any;
  montant = 0;
  model: any;
  logo:any;
  form: FormGroup;

  private _trialEndsAt;
  private _diff: number;
  private _days: number;
  private _hours: number;
  private _minutes: number;
  private _seconds: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _emissionService: EmissionService,
    private _userService: UserService,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      receiver: [[], [Validators.required]]
    });
    this.getEmission();
    this.user = this._userService.getUser();
  }

  ngOnInit() {}

  getEmission() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe(
      params => {
        let id = params["id"];
        if (!id) this._router.navigate(["emissions"]);
        this._emissionService.emissionDetail(id).subscribe(
          data => {
            this.isLoading = false;
            this.model = data;

            this.model.docs.forEach(el => {
              if(el.doc_type==='logo')
                this.logo = el.new_name
            });

            this.date_maturite = moment(this.model.emprunt.dateJouissance)
              .add(this.model.emprunt.maturite, "years")
              .format("DD-MM-YYYY");
            //   this.remainingTime = moment(this.model.emprunt.dateCloture).lang('fr').fromNow()
            this._trialEndsAt = this.model.emprunt.dateCloture;
            Observable.interval(1000)
              .map(x => {
                this._diff =
                  Date.parse(this._trialEndsAt) -
                  Date.parse(new Date().toString());
              })
              .subscribe(x => {
                this._days = this.getDays(this._diff);
                this._hours = this.getHours(this._diff);
                this._minutes = this.getMinutes(this._diff);
                this._seconds = this.getSeconds(this._diff);
              });

            this.model.souscriptions.forEach(element => {
              //console.log(element)
              this.rows.push({
                nom: element.investisseur_id.lastname,
                prenom: element.investisseur_id.firstname,
                montant: element.montant + " DNT",
                email: element.investisseur_id.email,
                tel: element.investisseur_id.tel
              });
              this.rows = [... this.rows]
            });
            console.log(this.rows);
          },
          error => {
            this.isLoading = false;
          }
        );
      },
      error => {
        this.isLoading = false;
      }
    );
  }
  tagsChanges(tags) {
    this.msg = false;
    this.form.get("receiver").setValue(tags);
    if (this.form.get("receiver").value.length > 0) {
      this.form.get("receiver").markAsUntouched();
      if (this.form.invalid) {
        this.disabled = true;
      }
    }
  }

  downloadDoc(id) {
    window.open(environment.apiUrl + "uploads/" + id, "_blank");
  }
  //email send
  send() {
    if (!this.form.invalid && this.form.get("receiver").value.length > 0) {
      this.disabled = true;
      let data = {
        to: this.form.get("receiver").value
      };
      this._emissionService.sendEmail(data).subscribe(dd => {
        this.disabled = false;
        this.msg = true;
      });
    }
  }

  investir() {
    if (this.montant > 0) {
      this.disabled = true;
      let data = {
        id: this.model._id,
        investisseur_id: this.user._id,
        montant: this.montant / 1000000
      };
      this._emissionService.investir(data).subscribe(dd => {
        console.log(dd);
        this.model.montant_souscrit = dd.montant_souscrit;

        this.disabled = false;
        this.msg = true;
      });
    }
  }

  //Expandable Table Code;
  @ViewChild("expTable") expTable: any;
  expanded: any = {};

  toggleExpandRow(row) {
    console.log(row);
    this.expTable.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }
}
