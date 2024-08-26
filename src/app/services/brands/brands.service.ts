import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { shared } from '../../shared/fileShared';
import { brandRes } from '../../interface/brand/brands';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(page:number):Observable<brandRes>{
    return this._HttpClient.get<brandRes>(`${shared.baseUrl}/api/v1/brands?page=${page}`);
  }
}
