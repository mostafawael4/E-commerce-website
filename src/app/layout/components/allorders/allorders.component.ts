import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders/orders.service';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { allOrdersRes, CartItem } from '../../../interface/orders/all';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  constructor(
    private _OrdersService: OrdersService,
    private _SignUpService: SignUpService
  ) {}
  userId!: string;
  orders !: allOrdersRes[];
  loadingPage!:boolean;

  ngOnInit(): void {
    this.loadingPage = true;
    this._SignUpService.userDetails.subscribe({
      next : ()=>{
        
        this.userId = this._SignUpService.userDetails.getValue()['id'];
        console.log(this._SignUpService.userDetails.getValue()['id']);
        this._OrdersService
          .getAllOrders(this._SignUpService.userDetails.getValue()['id'])
          .subscribe({
            next: (res) => {
              this.loadingPage = false;
              this.orders = res
              console.log(res);
            },
            error: (err) => {
              this.loadingPage = false;
              console.log(err);
            },
          });
      }
    })

    
  }
}
