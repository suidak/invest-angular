import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor( private http: Http) { }



register(data) {
  return this.http.post(environment.apiUrl + 'users/',data).map((response: Response) => response.json());
}

login(data) {
  return this.http.post(environment.apiUrl + 'users/login',data).map((response: Response) => response.json());
}

getUser(){
  return JSON.parse(localStorage.getItem("user")) ;
}

}
