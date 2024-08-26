import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { Data, Product2 } from '../../../interface/cart/cart';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  productsList!: Product2[];
  loadingPage!: boolean;
  data!: Data;
  cartId!: string;
  message!:string;
  count!:number;

  ngOnInit(): void {
    this.loadingPage = true;
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.loadingPage = false;
        this.cartId = res.cartId;
        this.productsList = res.data.products;
        this.data = res.data;
      },
      error: (err) => {
        this.loadingPage = false;
        this.message = err.error.message;
        console.log(err.error.message);
      },
    });

    this._CartService.count.subscribe({
      next : ()=>{
        this.count = this._CartService.count.getValue()
      }
    })
  }

  deleteItem(id: string) {
    this._CartService.RemoveSpecificCartItem(id).subscribe({
      next: (res) => {
        this.data = res.data;
        this.productsList = res.data.products;
        this._CartService.count.next(res.numOfCartItems);
        this._ToastrService.success('Item Deleted successfully');
        console.log(res);
        this._CartService.count.subscribe({
          next: () => {
            this.count = this._CartService.count.getValue();
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateQuantity(count: number, id: string) {
    const Count = {
      count: count.toString(),
    };
    if (count <= 0) {
      this.deleteItem(id);
    }
    this._CartService.UpdateCartProductQuantity(Count, id).subscribe({
      next: (res) => {
        this.data = res.data;
        this.productsList = res.data.products;
        this._ToastrService.success('quantity updated successfully');
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  
}
