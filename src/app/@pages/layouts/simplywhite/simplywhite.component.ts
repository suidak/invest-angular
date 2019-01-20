import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { RootLayout } from '../root/root.component';
import { pagesToggleService } from '../../services/toggler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'simplywhite-layout',
  templateUrl: './simplywhite.component.html',
  styleUrls: ['./simplywhite.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SimplyWhiteLayout extends RootLayout implements OnInit {
  firstname : any;
  lastname : any;
  userid : any;
  loggedIn = false;

  menuLinks = [
   
    {
      label:"Emissions",
      routerLink:"emissions",
      iconType:"fi",
      iconName:"airplay"
  },
];
 

  ngOnInit() {
    this.changeLayout("menu-pin");
    //Will sidebar close on screens below 1024
    this.autoHideMenuPin();
    
    if (localStorage.getItem('user')){
      this.firstname = JSON.parse(localStorage.getItem('user')).firstname 
      this.lastname = JSON.parse(localStorage.getItem('user')).lastname
      this.userid = JSON.parse(localStorage.getItem('user'))._id
    }else{
      this.loggedIn = false
    }
  }



}
