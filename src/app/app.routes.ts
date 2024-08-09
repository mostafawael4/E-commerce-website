import { Routes } from '@angular/router';
import { HomeComponent } from './layout/components/home/home.component';
import { ProductsComponent } from './layout/components/products/products.component';
import { CategoriesComponent } from './layout/components/categories/categories.component';
import { CartComponent } from './layout/components/cart/cart.component';
import { LoginComponent } from './layout/components/login/login.component';
import { RegisterComponent } from './layout/components/register/register.component';
import { NotfoundComponent } from './layout/addition/notfound/notfound.component';

export const routes: Routes = [
    {path : "" , redirectTo : "home" , pathMatch : "full"},
    {path : "home" , component : HomeComponent},
    {path : "products" , component : ProductsComponent},
    {path : "categories" , component : CategoriesComponent},
    {path : "cart" , component : CartComponent},
    {path : "login" , component : LoginComponent},
    {path : "register" , component : RegisterComponent},
    {path :"**" , component : NotfoundComponent}
];
