

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/productsservices/product.service';
import { Data, product } from '../../../interface/productsinterface/products';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    public _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  id!: string | null;
  productDetails!: Data;
  productImages!: string[];
  loadingPage!: boolean;
  image!: string;
  title!:string;
  description!:string;
  category!:string;
  brand!:string;
  rating!:number;
  price!:number;

  ngOnInit(): void {
    this.loadingPage = true;
    this._ActivatedRoute.paramMap.subscribe((par) => {
      this.id = par.get('id');
    });
    this._ProductService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.productImages = this.productDetails.images;
        this.loadingPage = false;
        this.image = this.productImages[0];
        this.title = this.productDetails.title;
        this.description = this.productDetails.description;
        this.category = this.productDetails.category.name;
        this.brand = this.productDetails.brand.name;
        this.rating = this.productDetails.ratingsAverage;
        this.price = this.productDetails.price;
      },
      error: (res) => {
        console.log(res);
        this.loadingPage = false;
      },
    });
  }

  changeImage(x: string) {
    this.image = x;
  }
}
