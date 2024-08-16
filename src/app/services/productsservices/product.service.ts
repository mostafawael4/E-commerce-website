import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shared } from '../../shared/fileShared';
import { Observable } from 'rxjs';
import { dataObject , details } from '../../interface/productsinterface/products';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private _HttpClient: HttpClient,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  getProductList(page: number): Observable<dataObject> {
    return this._HttpClient.get<dataObject>(
      `${shared.baseUrl}/api/v1/products?page=${page}`
    );
  }
  getProductDetails(id:string | null) :Observable<details>{
    
    return this._HttpClient.get<details>(`${shared.baseUrl}/api/v1/products/${id}`); 
  }
}
