import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { WhishlistService } from '../../../services/wishlist/whishlist.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private _SigninService: SignUpService,
    private _Router: Router,
    private _CartService: CartService,
    private _WhishlistService: WhishlistService
  ) {}
  flag!: boolean;
  isLoading: boolean = false;
  checkedFlag: boolean = false;

  submit() {
    this.isLoading = true;
    this._SigninService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;

        console.log(res);
        this.flag = false;
        localStorage.setItem('userToken', res.token);
        this._SigninService.decode();
        this._CartService.getLoggedUserCart().subscribe({
          next: (res) => {
            this._CartService.count.next(res.numOfCartItems);
          },
        });
        this._WhishlistService.getLoggedUserWishList().subscribe({
          next : (res)=>{
            this._WhishlistService.count.next(res.count);
          }
        })
        this._Router.navigate(['/home']);
      },
      error: (res) => {
        this.isLoading = false;
        console.log(res);
        this.flag = true;
      },
    });
  }

  toggle() {
    if (this.checkedFlag) {
      this.checkedFlag = false;
    } else {
      this.checkedFlag = true;
    }
  }
}
