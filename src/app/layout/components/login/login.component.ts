import { Component } from '@angular/core';
import { SigninService } from '../../../services/signin.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required , Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  constructor(private _SigninService: SigninService) {}
  flag!:boolean

  submit() {
    this._SigninService.login(this.loginForm.value).subscribe({
      next : ()=>{
        console.log("correct user")
        console.log(this._SigninService.login(this.loginForm.value));
        this.flag = false;
      },
      error :()=>{
        console.log("user doesn't exist");
        this.flag=true
      }
    })
  }
}
