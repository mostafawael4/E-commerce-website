import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layout/addition/navbar/navbar.component";
import { FooterComponent } from "./layout/addition/footer/footer.component";
import { ForgetpasswordComponent } from "./layout/addition/forgetpassword/forgetpassword.component";
import { AllordersComponent } from "./layout/components/allorders/allorders.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ForgetpasswordComponent, AllordersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce';
}
