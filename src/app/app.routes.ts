import { ProductdetailsComponent } from './layout/addition/productdetails/productdetails.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './layout/components/home/home.component';
import { ProductsComponent } from './layout/components/products/products.component';
import { CategoriesComponent } from './layout/components/categories/categories.component';
import { CartComponent } from './layout/components/cart/cart.component';
import { LoginComponent } from './layout/components/login/login.component';
import { RegisterComponent } from './layout/components/register/register.component';
import { NotfoundComponent } from './layout/addition/notfound/notfound.component';
import { loginguardGuard } from './gurds/authenticationguard/loginguard.guard';
import { ForgetpasswordComponent } from './layout/addition/forgetpassword/forgetpassword.component';
import { homeguardGuard } from './gurds/homeguard/homeguard.guard';
import { ShippingComponent } from './layout/addition/shipping/shipping.component';
import { AllordersComponent } from './layout/components/allorders/allorders.component';
import { title } from 'process';
import { BrandsComponent } from './layout/components/brands/brands.component';
import { WishlistComponent } from './layout/addition/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [loginguardGuard],
    title: 'home',
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [loginguardGuard],
    title: 'products',
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [loginguardGuard],
    title: 'wishlist',
  },
  {
    path: 'allorders',
    component: AllordersComponent,
    canActivate: [loginguardGuard],
    title: 'allOrders',
  },
  {
    path: 'productdetails/:id',
    component: ProductdetailsComponent,
    canActivate: [loginguardGuard],
    title: 'productDetails',
  },
  {
    path: 'shipping/:cartId',
    component: ShippingComponent,
    canActivate: [loginguardGuard],
    title: 'shipping',
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [loginguardGuard],
    title: 'categories',
  },
  {
    path: 'brand',
    component: BrandsComponent,
    canActivate: [loginguardGuard],
    title: 'brands',
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [loginguardGuard],
    title: 'cart',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [homeguardGuard],
    title: 'login',
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
    canActivate: [homeguardGuard],
    title: 'forgetPassword',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [homeguardGuard],
    title: 'register',
  },
  { path: '**', component: NotfoundComponent },
];
