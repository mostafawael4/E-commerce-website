import { Component, OnInit } from '@angular/core';
import { WhishlistService } from '../../../services/wishlist/whishlist.service';
import { Data } from '../../../interface/wishlist/wishlist';
import { loadZone } from 'zone.js/lib/zone';
import { CartService } from '../../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WhishlistService: WhishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  LoadingPage!: boolean;
  wishList!: Data[];
  count!:number
  ngOnInit(): void {
    this.LoadingPage = true;
    this.fetch()
  }
  fetch() {
    this._WhishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishList = res.data;
        this.LoadingPage = false;
        console.log(res);
      },
      error: (err) => {
        this.LoadingPage = false;
        console.log(err);
      },
    });
    this._WhishlistService.count.subscribe({
      next : ()=>{
        this.count = this._WhishlistService.count.getValue()
      }
    })
  }

  addProductToCart(id: string) {
    const ID = {
      productId: id,
    };
    this._CartService.addProductToCart(ID).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.count.next(res.numOfCartItems);
        console.log(res);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
        console.log(err);
      },
    });
  }

  removeItem(id: string) {
    this._WhishlistService.RemoveProductFromWhishList(id).subscribe({
      next: (res) => {
        this._WhishlistService.count.next(res.data.length)
        this._ToastrService.success(res.message);
        this.fetch();
        console.log(res);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
        console.log(err);
      },
    });
  }
}
