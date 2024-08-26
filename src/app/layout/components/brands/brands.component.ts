import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../services/brands/brands.service';
import { Data } from '../../../interface/brand/brands';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgClass],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) {}
  i: number = 1;
  brandList!: Data[];
  loadingPage!: boolean;
  ngOnInit(): void {
    this.fetch();
  }

  fetch(){
    this.loadingPage = true;
    this._BrandsService.getAllBrands(this.i).subscribe({
      next: (res) => {
        this.loadingPage = false;
        this.brandList = res.data;
        console.log(res);
      },
      error: (err) => {
        this.loadingPage = false;
        console.log(err);
      },
    });
  }

  changePage(x:number){
    this.i = x;
    this.fetch()
  }
}
