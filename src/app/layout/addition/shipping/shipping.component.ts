import { shared } from './../../../shared/fileShared';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss',
})
export class ShippingComponent implements OnInit {
  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, Validators.required),
  });

  constructor(
    private _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _Router: Router
  ) {}
  id!: string;
  cashLoading!: boolean;
  cardLoading!: boolean;
  message!:string;
  flag:boolean = false
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        this.id = res['cartId'];
        console.log(res['cartId']);
      },
      error : err=>{
        
        
        console.log(err)
      }
    });
  }

  cashShipping() {
    this.cashLoading = true;
    if (this.shippingForm.valid) {
      this._OrdersService
        .createCashOrder(this.shippingForm.value, this.id)
        .subscribe({
          next: (res) => {
            this.cashLoading = false;
            this._CartService.count.next(0);
            this._Router.navigate(['/allorders']);
            console.log(res);
          },
          error: (err) => {
            this.cashLoading = false;
            this.message = "your cart is empty"
            this.flag = true;
            console.log(err);
          },
        });
    }
  }



  cardShipping(){
    this.cardLoading = true;
    this._OrdersService.createCardOrder(this.shippingForm.value , this.id).subscribe({
      next : res=>{
        this.cardLoading = false;
        window.open(res.session.url , '_self');
        // window.location.href = res.session.url;
        console.log(res)
      },
      error : err=>{
      this.cardLoading = false;
        this.message = 'your cart is empty';
        this.flag = true;
        console.log(err)
      }
    })
  }


}
