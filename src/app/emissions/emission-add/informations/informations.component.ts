import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EmissionService } from '../../../_services/emission.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {

  fileList=[]
  env = environment.apiUrl 
  //@ViewChild('companyInfoForm') companyInfoForm:NgForm;

  @Output() modelSubmit = new EventEmitter();

  informationsForm: FormGroup;
  types;

  searchTerm$ = new Subject<string>();
  searchObs$;

  showRelatedCompanies: boolean = true;

  constructor(private fb: FormBuilder, private _emissionService: EmissionService
  ) {
    this.informationsForm = this.fb.group({
      _id: [null, []],
      raison_sociale: ['', [Validators.required]],
      site: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      secteur: ['', [Validators.required]],
      forme_juridique: ['SA', [Validators.required]],
      status: ['oui', [Validators.required]],

    });
  }

  ngOnInit() {
    this.onChanges();

  }
  onChanges(): void {
    this.informationsForm.get('raison_sociale').valueChanges.subscribe(val => {
      if (val.length > 0) {
        this._emissionService.getRaison(val).subscribe(data => {
          if (!data.msg && val) {
            this.informationsForm.get("_id").setValue(data._id);
            this.informationsForm.get("site").setValue(data.site);
            this.informationsForm.get("secteur").setValue(data.secteur);
            this.informationsForm.get("adresse").setValue(data.adresse);
            this.informationsForm.get("forme_juridique").setValue(data.forme_juridique);

          }
          else {
            this.informationsForm.get("_id").setValue(null);
            this.informationsForm.get("site").setValue("");
            this.informationsForm.get("secteur").setValue("");
            this.informationsForm.get("adresse").setValue("");

          }

        })
      }

    });
  }
  save() {
    for (const i in this.informationsForm.controls) {
      this.informationsForm.controls[i].markAsTouched();
    };
    if (this.informationsForm.invalid) return false;

    if (this.informationsForm.get('forme_juridique').value == "SA" && this.informationsForm.get('status').value == "oui") {
      console.log(this.informationsForm.get('_id').value)
      if (this.informationsForm.get('_id').value) {
        this.modelSubmit.emit(this.informationsForm.get('_id').value)
      } else {
        this._emissionService.setInformation(this.informationsForm.value).subscribe(data => {
          if (!data.err)
            this.modelSubmit.emit(data)
          this.informationsForm.get('_id').setValue(data)
        })
      }
    }
  }

}
