import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../layout/addition/footer/footer.component";

@Component({
  selector: 'app-authenticationpages',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './authenticationpages.component.html',
  styleUrl: './authenticationpages.component.scss'
})
export class AuthenticationpagesComponent {

}
