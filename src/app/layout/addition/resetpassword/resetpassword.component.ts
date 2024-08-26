import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { Router, RouterLink } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent {
  
  emailUser: any = localStorage.getItem('Email');

  resetCodeForm: FormGroup = new FormGroup({
    email: new FormControl(this.emailUser),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  constructor(private _SigninService: SignUpService, private _Router: Router) {}

  isLoading: boolean = false;
  message!: string;
  flag!: boolean;
  disable:boolean = true;

  submit() {
    this.isLoading = true;
    this._SigninService.resetCode(this.resetCodeForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.flag = false;
        console.log(res);
        console.log(this.resetCodeForm.value)
        localStorage.setItem('userToken', res.token);
        this._SigninService.decode();
        this._Router.navigate(['/home']);
      },
      error: (res) => {
        console.log(this.emailUser);
        this.message = res.error.message;
        this.flag = true;
        this.isLoading = false;
        console.log(res);
        console.log(this.resetCodeForm.value);
      },
    });
  }
}
