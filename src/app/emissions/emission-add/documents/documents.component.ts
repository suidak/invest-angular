import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  fileList1=[];
  fileList2=[];
  fileList3=[];
  id: any;
  env = environment.apiUrl 

  @Input() set getEmissionId(value) {
    this.id = value
  }
  constructor() { }

  ngOnInit() {
  }

}
