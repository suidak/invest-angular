import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  msg: any='';

  @Output() updateEmission = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.updateEmission.emit(this.msg)
  }

  updateEmissionQuestion(data){
    console.log("change occured in TextArea")
    console.log(data)
    this.updateEmission.emit(data)
  
  }
}
