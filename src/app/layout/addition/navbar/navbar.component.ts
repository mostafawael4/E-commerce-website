import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Sign } from 'crypto';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { FlowbiteService } from '../../../services/flowbite/flowbit.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(
    public _SignUpService: SignUpService,
    private _FlowbiteService: FlowbiteService
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
  }
}
