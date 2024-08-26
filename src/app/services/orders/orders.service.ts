import { cardRes, cashRes, shippingRes } from './../../interface/shipping/shipping';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shared } from '../../shared/fileShared';
import { Observable } from 'rxjs';
import { allOrdersRes } from '../../interface/orders/all';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  userToken!:string;
  constructor(private _HttpClient: HttpClient) {
    if(typeof localStorage !='undefined')
    {
      this.userToken = localStorage.getItem('userToken')!;
    }
  }

  
  createCashOrder(data:shippingRes , cartId:string) : Observable<cashRes>{
    return this._HttpClient.post<cashRes>(
      `${shared.baseUrl}/api/v1/orders/${cartId}`,
      data.shippingAddress,
      {
        headers: {
          token: this.userToken,
        },
      }
    );   
  }


  createCardOrder(data:shippingRes , cartId : string) : Observable<cardRes>{
    return this._HttpClient.post<cardRes>(
      `${shared.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${shared.server}`,
      data,
      {
        headers: {
          token: this.userToken,
        },
      }
    );
  }

  getAllOrders(id:string) : Observable<allOrdersRes[]>{
    return this._HttpClient.get<allOrdersRes[]>(
      `${shared.baseUrl}/api/v1/orders/user/${id}`
    );
  }






}
