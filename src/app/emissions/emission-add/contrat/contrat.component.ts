import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {

  fileList=[];
  id: any;
  fileHref: any;
  env = environment.apiUrl 

  @Input() set getEmissionId(value) {
    this.id = value
    
  }
  constructor() { }

  ngOnInit() {
  }

  downloadDoc(){
    window.open(environment.apiUrl+'uploads/contrat-standard.pdf',"_blank");
  }

}
