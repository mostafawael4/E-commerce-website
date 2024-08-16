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

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [loginguardGuard] },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [loginguardGuard],
  },
  {
    path: 'productdetails/:id',
    component: ProductdetailsComponent,
    canActivate: [loginguardGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [loginguardGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [loginguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotfoundComponent, canActivate: [loginguardGuard] },
];
