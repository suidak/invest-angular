import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import * as moment from "moment";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser ) {
      this._router.navigate(['/users']);
      return false;
    } 
    return true ;
  }
}
