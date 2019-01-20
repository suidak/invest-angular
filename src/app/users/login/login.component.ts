import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msg ="ok"
  user={
    "email":"bla@gmail.com",
    "password":"bla"
   }
  constructor(private _serviceUser : UserService, private router : Router) { }

  ngOnInit() {
  }

  login(){
    this._serviceUser.login({user:this.user}).subscribe(data => {
      console.log(data.user)
      if(data.user==undefined){
        console.log("wrong credentials")
        this.msg = "Vérifiez vos données!"
        this.router.navigate(['/app/users'])
      }
      else{
        localStorage.setItem('user',JSON.stringify(data.user))
        this.router.navigate(['/app/emissions'])
      }

    })
  }

}
