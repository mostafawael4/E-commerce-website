import { email } from './../../../interface/authentication/register-data';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { CodeFormComponent } from '../code-form/code-form.component';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule , CodeFormComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  forgetFlag :boolean = true;
  codeFlag : boolean = false;
  flag!: boolean;
  isLoading: boolean = false;
  message!:string;
  constructor(private _SignUpService: SignUpService) {}

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  submit() {
    this.isLoading = true;
    this._SignUpService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next : res=>{
        this.isLoading = false;
        console.log(res.message);
        this.flag = false;
        this.message = res.message
        this.forgetFlag = false;
        this.codeFlag = true;
        localStorage.setItem('Email' , this.forgetPasswordForm.value.email)
      },
      error : res=>{
        this.isLoading = false;
        console.log(res.error.message);
        this.flag = true;
        this.message = res.error.message;
        ;
      }
    })
  }
}
