import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shared } from '../../shared/fileShared';
import { BehaviorSubject, Observable } from 'rxjs';
import { cartResponse } from '../../interface/cart/cart';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  userToken!: string;
  count = new BehaviorSubject<number>(0);
  constructor(private _HttpClient: HttpClient) {
    if (typeof localStorage != 'undefined') {
      this.userToken = localStorage.getItem('userToken')!;
      this.getLoggedUserCart().subscribe({
        next: (res) => {
          this.count.next(res.numOfCartItems);
        },
      });
    }
    
  }

  addProductToCart(productId: { productId: string }): Observable<cartResponse> {
    return this._HttpClient.post<cartResponse>(
      `${shared.baseUrl}/api/v1/cart`,
      productId,
      {
        headers: {
          token: this.userToken,
        },
      }
    );
  }

  getLoggedUserCart(): Observable<cartResponse> {
    return this._HttpClient.get<cartResponse>(`${shared.baseUrl}/api/v1/cart`, {
      headers: {
        token: this.userToken,
      },
    });
  }

  UpdateCartProductQuantity(
    count: { count: string },
    id: string
  ): Observable<cartResponse> {
    return this._HttpClient.put<cartResponse>(
      `${shared.baseUrl}/api/v1/cart/${id}`,
      count,
      {
        headers: {
          token: this.userToken,
        },
      }
    );
  }

  RemoveSpecificCartItem(id: string): Observable<cartResponse> {
    return this._HttpClient.delete<cartResponse>(
      `${shared.baseUrl}/api/v1/cart/${id}`,
      {
        headers: {
          token: this.userToken,
        },
      }
    );
  }
}
