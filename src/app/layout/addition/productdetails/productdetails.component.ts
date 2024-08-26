

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/productsservices/product.service';
import { Data, product } from '../../../interface/productsinterface/products';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    public _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _CartService: CartService
  ) {}
  id!: string | null;
  productDetails!: Data;
  productImages!: string[];
  loadingPage!: boolean;
  // image!: string;
  title!: string;
  description!: string;
  category!: string;
  // brand!:string;
  // rating!:number;
  price!: number;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 1500,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.loadingPage = true;
    this._ActivatedRoute.paramMap.subscribe((par) => {
      this.id = par.get('id');
    });
    this._ProductService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.loadingPage = false;
        this.productDetails = res.data;
        this.productImages = this.productDetails.images;
        this.title = this.productDetails.title;
        this.price = this.productDetails.price;
        this.description = this.productDetails.description;
        this.category = this.productDetails.category.name;

        console.log(res);
      },
      error: (err) => {
        this.loadingPage = false;
        console.log(err);
      },
    });
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


