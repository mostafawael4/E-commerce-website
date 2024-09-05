import { forgetResponse, newPassword } from './../../interface/authentication/register-data';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import {
  code,
  email,
  Login,
  RegisterData,
} from '../../interface/authentication/register-data';
import { shared } from '../../shared/fileShared';
import { jwtDecode } from 'jwt-decode';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  userDetails: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (typeof localStorage != 'undefined') {
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

  forgetPassword(email: email): Observable<forgetResponse> {
    return this._HttpClient.post<forgetResponse>(
      `${shared.baseUrl}/api/v1/auth/forgotPasswords`,
      email
    );
  }

  codeSend(code: code): Observable<forgetResponse> {
    return this._HttpClient.post<forgetResponse>(
      `${shared.baseUrl}/api/v1/auth/verifyResetCode`,
      code
    );
  }

  resetCode(data: newPassword): Observable<any> {
    return this._HttpClient.put(
      `${shared.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }

  decode() {
    // if(typeof localStorage !="undefined")
    // {
    //      const token = JSON.stringify(localStorage.getItem('userToken'));
    //      const decode = jwtDecode(token);
    //      this.userDetails.next(decode);
    // }
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decode = jwtDecode(token);
    this.userDetails.next(decode);
  }
  

  logOut() {
    localStorage.removeItem('userToken');
    this.userDetails.next(null);
    this._Router.navigate(['/login']);
  }
}
