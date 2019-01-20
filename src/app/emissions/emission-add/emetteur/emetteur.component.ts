import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmissionService } from '../../../_services/emission.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-emetteur',
  templateUrl: './emetteur.component.html',
  styleUrls: ['./emetteur.component.scss']
})
export class EmetteurComponent implements OnInit {

  fileList=[]
  env = environment.apiUrl 
  id:any;
  @Input() set getEmissionId(value){
    this.id=value
  }
  isFinished:any;
  @Input() set finishState(value){
    if(value==true)
      this.save()
  }
  @Output() modelSubmit = new EventEmitter();

  emetteurForm: FormGroup;
  constructor(private fb: FormBuilder, private _emissionService: EmissionService) {
    this.emetteurForm = this.fb.group({
      _id: [null, []],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      societe: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      site: ['', [Validators.required]],
      email: ['', [Validators.required]],
      st: ['true', [Validators.required]],
    });
   }

  ngOnInit() {
    this.onChanges();
  }

  save() {
  
  }

  onChanges(): void {
    this.emetteurForm.valueChanges.subscribe(val => {
      for (const i in this.emetteurForm.controls) {
        this.emetteurForm.controls[i].markAsTouched();
      };
      if (this.emetteurForm.invalid) 
      {
        this.modelSubmit.emit({model:this.emetteurForm.value,finished : false})
        return false;
      }
  
     this.modelSubmit.emit({model:this.emetteurForm.value,finished : true})
           
    });
  }


}
