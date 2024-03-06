import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService} from "@auth0/angular-jwt";
import { TokenApiModel } from 'src/models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseURL = "https://mmdbapi.azurewebsites.net/api";
  private tokenPayload: any;
  constructor(private http: HttpClient, 
    private router:Router,
    ) {
      this.tokenPayload = this.decodedToken();
     }

  Login(userObj: any)
  {
    return this.http.post<any>(`${this.baseURL}/Auth/Login`, userObj)
  }
  Register(userObj: any)
  {
    return this.http.post<any>(`${this.baseURL}/Auth/Register`, userObj)
  }
  SignOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  storeToken(token: string){
    localStorage.setItem('token', token);
  }
  storeRefreshToken(token: string){
    localStorage.setItem('refresh', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getRefreshToken(){
    return localStorage.getItem('refresh');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken() {
    const Jwt = new JwtHelperService();
    const token = this.getToken()!;
    return Jwt.decodeToken(token);
  }

  getUsernameFromToken(){
    if(this.tokenPayload){
      return this.tokenPayload.unique_name;
    }
  }
  getRoleFromToken(){
    if(this.tokenPayload){
      return this.tokenPayload.role;
    }
  }

  renewToken(tokenApi:TokenApiModel)
  {
    return this.http.post<any>(`${this.baseURL}/Auth/RefreshToken`, tokenApi);
  }
}
