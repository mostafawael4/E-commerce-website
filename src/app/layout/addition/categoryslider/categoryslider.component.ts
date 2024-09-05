import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { category } from '../../../interface/category/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-categoryslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss',
})
export class CategorysliderComponent implements OnInit {
  categoryList!: category[];
  loadingPage: boolean = false;
  constructor(private _CategoryService: CategoryService) {}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 900,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.loadingPage = true;
    this._CategoryService.getCategory().subscribe({
      next: (res) => {
        this.loadingPage = false;
        this.categoryList = res.data;
      },
      error: (err) => {
        this.loadingPage = false;
      },
    });
  }
}
