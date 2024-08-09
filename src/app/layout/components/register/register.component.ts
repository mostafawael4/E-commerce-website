import { SignUpService } from './../../../services/sign-up.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{3,20}$/),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{2,20}[0-9]{0,10}@gmail.com$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      rePassword: new FormControl(null, Validators.required),
    },
    this.passwordMatch
  );

  passwordMatch(g: any): { [key: string]: boolean } | null {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
  constructor(private _SignUpService: SignUpService) {}

  message!:string;
  flag!:boolean;
  submitForm() {
    this._SignUpService.register(this.registerForm.value).subscribe({
      next : ()=>{
        this.message = 'account have been created successfully';
        console.log('Registration successful');
        this.flag=false;
      },
      error : ()=>{
        this.message =  'user name or Email are exist already';
        console.log('Registration failed');
        this.flag = true;
      }  
      })
  }
}
