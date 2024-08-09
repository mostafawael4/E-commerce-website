import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterData } from '../interface/register-data';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = 'https://ecommerce.routemisr.com';

  register(userData: RegisterData): Observable<RegisterData> {
    return this._HttpClient.post<RegisterData>(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }
}
