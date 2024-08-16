import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import {
  Login,
  RegisterData,
} from '../../interface/authentication/register-data';
import { shared } from '../../shared/fileShared';
import { jwtDecode } from 'jwt-decode';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignUpService{
  userDetails: BehaviorSubject<any> = new BehaviorSubject(null);

  

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if(typeof localStorage != 'undefined')
    {
      if (localStorage.getItem('userToken')) {
        this.decode();
      }
    }
  }
  baseUrl: string = shared.baseUrl;

  register(userData: RegisterData): Observable<any> {
    return this._HttpClient.post<any>(
      `${this.baseUrl}/api/v1/auth/signup`,
      userData
    );
  }

  login(userData: Login): Observable<any> {
    return this._HttpClient.post<any>(
      `${this.baseUrl}/api/v1/auth/signin`,
      userData
    );
  }

  decode() {
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decode = jwtDecode(token);
    this.userDetails.next(decode);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userDetails.next(null);
    this._Router.navigate(['/login'])
  }
}
