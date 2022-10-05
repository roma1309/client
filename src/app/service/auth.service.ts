import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public login(user: { username: string; password: string; }):Observable<any>{
    return this.http.post(AUTH_API+'signin',{
      username:user.username,
      password:user.password
    },httpOptions);
  }

  public register(user: { email: any; username: any; password: any; firstname: any; lastname: any; confirmPassword:any}): Observable<any>{
    return this.http.post(AUTH_API+'signup',{
      email:user.email,
      username:user.username,
      password:user.password,
      firstname:user.firstname,
      lastname:user.lastname,
      confirmPassword:user.confirmPassword
    },httpOptions);
  }
}
