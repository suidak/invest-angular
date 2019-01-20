import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-emission',
  templateUrl: './emission.component.html',
  styleUrls: ['./emission.component.scss']
})
export class EmissionComponent implements OnInit {
  env : any = environment.apiUrl
  @Input() em : any;
  @Output() navigateTodetails = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  navigate(id){
    this.navigateTodetails.emit(id);    
  }
}
