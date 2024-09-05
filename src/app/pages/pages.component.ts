import { Component } from '@angular/core';
import { NavbarComponent } from "../layout/addition/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../layout/addition/footer/footer.component";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
