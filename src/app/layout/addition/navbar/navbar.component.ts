import { Subcategory } from './../../../interface/productsinterface/products';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Sign } from 'crypto';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { FlowbiteService } from '../../../services/flowbite/flowbit.service';
import { initFlowbite } from 'flowbite';
import { CartService } from '../../../services/cart/cart.service';
import { WhishlistService } from '../../../services/wishlist/whishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  count!: number;
  wishCount!: number;
  constructor(
    public _SignUpService: SignUpService,
    private _FlowbiteService: FlowbiteService,
    private _CartService: CartService,
    private _WhishlistService: WhishlistService
  ) {}

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      console.log('Flowbite loaded', flowbite);
    });

    this._SignUpService.userDetails.subscribe({
      next: () => {
        if (this._SignUpService.userDetails.getValue() != null)
          this.isLogin = true;
        else this.isLogin = false;
      },
    });

    this._CartService.count.subscribe({
      next: () => {
        this.count = this._CartService.count.getValue();
        console.log(this._CartService.count.getValue());
      },
    });

    this._WhishlistService.count.subscribe({
      next : ()=>{
        this.wishCount = this._WhishlistService.count.getValue()
      }
    })
  }
}
