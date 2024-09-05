import { Component } from '@angular/core';
import { NavbarComponent } from "../layout/addition/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [NavbarComponent , RouterOutlet],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
