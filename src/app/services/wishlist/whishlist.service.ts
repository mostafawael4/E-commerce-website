import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RootObject, wishListRes } from '../../interface/wishlist/wishlist';
import { shared } from '../../shared/fileShared';

@Injectable({
  providedIn: 'root',
})
export class WhishlistService {
  userToken!: string;
  count = new BehaviorSubject(0);
  constructor(private _HttpClient: HttpClient) {
    if (typeof localStorage != 'undefined') {
      this.userToken = localStorage.getItem('userToken')!;
      this.getLoggedUserWishList().subscribe({
        next : res=>{
          this.count.next(res.count)
        }
      })
    }
  }

  addItem(productId: string): Observable<RootObject> {
    return this._HttpClient.post<RootObject>(
      `${shared.baseUrl}/api/v1/wishlist`,
      { productId: productId },
      {
        headers: {
          token:  localStorage.getItem('userToken')!,
        },
      }
    );
  }

  getLoggedUserWishList(): Observable<wishListRes> {
    return this._HttpClient.get<wishListRes>(
      `${shared.baseUrl}/api/v1/wishlist`,
      {
        headers: {
          token:  localStorage.getItem('userToken')!,
        },
      }
    );
  }

  RemoveProductFromWhishList(id:string): Observable<RootObject> {
    return this._HttpClient.delete<RootObject>(
      `${shared.baseUrl}/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem('userToken')!,
        },
      }
    );
  }
}
