import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { category, categoryResponse } from '../../../interface/category/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoryService: CategoryService) {}
  loadingPage!: boolean;
  categoryList!:category[]

  ngOnInit(): void {
    this.loadingPage = true;
    this._CategoryService.getCategory().subscribe({
      next: (res) => {
        this.loadingPage = false;
        this.categoryList = res.data
        console.log(res.data);
      },
      error: (err) => {
        this.loadingPage = false;
        console.log(err);
      },
    });
  }
}
