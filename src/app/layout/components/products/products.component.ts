import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/productsservices/product.service';
import {
  Metadata,
  product,
} from '../../../interface/productsinterface/products';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _Router: Router,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  productList!: product[];
  images!: string;
  i: number = 1;
  loadingPage!: boolean;

  changePage(x: number) {
    this.i = x;
    this.fetchData();
  }

  fetchData() {
    this.loadingPage = true;
    this._ProductService.getProductList(this.i).subscribe({
      next: (res) => {
        this.productList = res.data;
        this.loadingPage = false;
      },
      error: () => {
        console.log('error');
        this.loadingPage = false;
      },
    });
  }
  ngOnInit(): void {
    this.fetchData();
  }

  openDetails(id: string) {
    this._Router.navigate(['/productdetails', id]);
  }

  addToCart(id: string) {
    const ID = {
      productId: id,
    };
    this._CartService.addProductToCart(ID).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.count.next(res.numOfCartItems)
        console.log(res);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
        console.log(err);
      },
    });
  }
}
