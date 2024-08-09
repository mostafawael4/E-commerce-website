import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interface/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  
  constructor(private _HttpClient: HttpClient) {}

  login(userData: Login): Observable<Login> {
    return this._HttpClient.post<Login>(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }
}
