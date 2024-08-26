import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  constructor(private _SigninService: SignUpService , private _Router:Router) {}
  flag!: boolean;
  isLoading: boolean = false;

  submit() {
    this.isLoading = true;
    this._SigninService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        console.log(res);
        this.flag = false;
        localStorage.setItem("userToken" , res.token)
        this._SigninService.decode()
        this._Router.navigate(['/home'])
      },
      error: (res) => {
        this.isLoading = false;
        console.log(res);
        this.flag = true;
      },
    });
  }
}
