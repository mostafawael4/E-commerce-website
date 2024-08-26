import { SearchPipe } from './../../../pipes/searchpipe/search.pipe';
import { Component, OnInit } from '@angular/core';
import { HomesliderComponent } from '../../addition/homeslider/homeslider.component';
import { CategorysliderComponent } from '../../addition/categoryslider/categoryslider.component';
import { ProductService } from '../../../services/productsservices/product.service';
import { product } from '../../../interface/productsinterface/products';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass, NgStyle } from '@angular/common';
import { WhishlistService } from '../../../services/wishlist/whishlist.service';
import { stat } from 'node:fs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomesliderComponent,
    CategorysliderComponent,
    FormsModule,
    SearchPipe,
    NgClass,
    NgStyle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loadingPage!: boolean;
  productList!: product[];
  heartStatus: { [key: string]: boolean } = {};
  search!: string;
  state!:any[]
  constructor(
    private _ProductService: ProductService,
    private _Router: Router,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WhishlistService: WhishlistService
  ) {}

  ngOnInit(): void {
    this.loadingPage = true;
    this._ProductService.getProductList(1).subscribe({
      next: (res) => {
        this.loadingPage = false;
        this.productList = res.data;
        res.data.forEach(item =>{
          // this.heartStatus[item._id] = true;
        })
        console.log(res);
      },
      error: (err) => {
        this.loadingPage = false;
        console.log(err);
      },
    });
  }

  goToProductDetails(id: string) {
    this._Router.navigate(['/productdetails', id]);
  }

  addToCart(id: string) {
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

  toggleHeart(productId: string): void {
    if (this.heartStatus[productId]) {
      this.heartStatus[productId] = false;
      this._WhishlistService.RemoveProductFromWhishList(productId).subscribe({
        next : res=>{
          this._WhishlistService.count.next(res.data.length);
          this._ToastrService.success(res.message);
        },
        error : err=>{
          this._ToastrService.success(err.message);
          console.log(err);
        }
      })
    } else {
      this.heartStatus[productId] = true;
      this._WhishlistService.addItem(productId).subscribe({
        next: (res) => {
          this._WhishlistService.count.next(res.data.length)
          this._ToastrService.success(res.message)
          console.log(res);
        },
        error: (err) => {
          this._ToastrService.success(err.message);
          console.log(err);
        },
      });
    }
   
  }

  isHeartRed(productId: string): boolean {
    return this.heartStatus[productId];
  }
}
