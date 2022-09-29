import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public login(user: { username: any; password: any; }):Observable<any>{
    return this.http.post(AUTH_API+'signin',{
      username:user.username,
      password:user.password
    });
  }

  public register(user: { email: any; username: any; password: any; firstname: any; lastname: any; }): Observable<any>{
    return this.http.post(AUTH_API+'signup',{
      email:user.email,
      username:user.username,
      password:user.password,
      firstname:user.firstname,
      lastname:user.lastname
    })
  }
}
