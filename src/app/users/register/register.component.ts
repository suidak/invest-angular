import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  txtfname;
  txtlname;
  txtusername;
  txtpassword;
  txtemail;
  role="Emetteur";
  constructor(private _serviceUser: UserService, private router: Router) { }

  ngOnInit() {
  }


  register(){
    var obj = {
      email : this.txtemail,
      password : this.txtpassword,
      firstname : this.txtfname,
      lastname : this.txtlname,
      role : this.role
    }
    console.log(obj)
    this._serviceUser.register({user:obj}).subscribe(data => {
      console.log(data.user)
      if(!data.user){
        this.router.navigate(['/app/users/register'])
      }
      this.router.navigate(['/app/users'])

    })
  }

}
