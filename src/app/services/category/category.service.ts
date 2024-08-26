import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shared } from '../../shared/fileShared';
import { Observable } from 'rxjs';
import { categoryResponse } from '../../interface/category/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}

  getCategory():Observable<categoryResponse>{
    return this._HttpClient.get<categoryResponse>(
      `${shared.baseUrl}/api/v1/categories`
    );
  }
}
